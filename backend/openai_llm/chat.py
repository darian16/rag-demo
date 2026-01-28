import sys

if sys.platform != 'win32':
  sys.modules['sqlite3'] = __import__('pysqlite3')

import os
from os.path import join

from langchain_chroma import Chroma
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.runnables.graph import MermaidDrawMethod
from pydantic import BaseModel
from langgraph.graph import START, END
from langgraph.graph import StateGraph
# -------------------------------------------------------------

class GraphStateSandBox(BaseModel):
  sandbox: int = 1
  question: str = ""
  question_rewritten: bool = False
  context_documents: list = []
  relevant_documents: list = []
  generation: str = ""
# -------------------------------------------------------------

class GraphState(BaseModel):
  sandbox: int = 0
  question: str = ""
  question_rewritten: bool = False
  context_documents: list = []
  relevant_documents: list = []
  generation: str = ""

  llm: ChatOpenAI = None
# -------------------------------------------------------------

def getLlmModel(sandbox):
  if sandbox == 1:
    return None

  return ChatOpenAI(model="gpt-4o", temperature=0)
# -------------------------------------------------------------

def getVectorStoreContext():
  base_dir = join(os.path.dirname(__file__), '..', 'context')
  gpt_embebber = GPT4AllEmbeddings(gpt4all_kwargs= {'allow_download':False})

  vectorstore = Chroma(
    persist_directory=base_dir,
    collection_name='store',
    embedding_function=gpt_embebber
  )

  return vectorstore.as_retriever(search_kwargs={"k": 5})
# -------------------------------------------------------------

def get_context_grading_chain(llm):
  prompt = ChatPromptTemplate.from_template(
    """You are a grader assessing whether a retrieved document is relevant to a user question.

    DOCUMENT:
    {context}

    QUESTION:
    {question}

    INSTRUCTIONS:
    - Grade RELEVANCE: Does the document contain information that can help answer the question?
    - Use a LENIENT standard. Grade as relevant if the document contains ANY information related to the question.
    - Goal: Filter out completely irrelevant documents.
    - Respond with a JSON object containing a single key "score" with value "yes" or "no".
    - Do NOT include any other text or explanation.

    OUTPUT FORMAT:
    {{"score": "yes"}} OR {{"score": "no"}}"""
  )

  return prompt | llm | JsonOutputParser()
# -------------------------------------------------------------

def get_rewrite_question_chain(llm):
  prompt = ChatPromptTemplate.from_template(
    """You are optimizing a question for better document retrieval in customs/import/export domain.

    ORIGINAL QUESTION: {question}
    DOMAIN CONTEXT: {context}

    REQUIREMENTS:
    1. MUST INCLUDE ALL KEYWORDS from the original question
    2. Can add 1-2 relevant domain terms (customs, tariff, declaration, compliance, etc.)
    3. Can rephrase for clarity or better structure
    4. Keep it concise (1 sentence preferred, max 2 sentences)

    EXAMPLE 1:
    Original: "import tax"
    Keywords to preserve: "import", "tax"
    Rewritten: "What are the import taxes and customs duties for international shipments?"

    EXAMPLE 2:
    Original: "empty?"
    Keywords to preserve: "empty"
    Rewritten: "How to declare empty containers?"

    YOUR REWRITE:"""
  )

  return prompt | llm | StrOutputParser()
# -------------------------------------------------------------

def get_rag_search_chain(llm):
  prompt = ChatPromptTemplate.from_template(
    """You are an assistant for question-answering tasks. \n
    Use the following pieces of retrieved context to answer the question. \n
    Use three sentences maximum and keep the answer concise. \n
    Question: {question} \n 
    Context: {context} \n
    Answer:"""
  )

  return prompt | llm | StrOutputParser()
# -------------------------------------------------------------

def context_retriever_node(state):
  print("---context_retriever_node---")

  retriever = getVectorStoreContext()
  if not retriever:
    print("---context vectorial database does not exists---")
    return state

  state.context_documents = retriever.invoke(state.question)
  state.relevant_documents = []
  print(f'---documents count: {len(state.context_documents)}---')

  return state
# -------------------------------------------------------------

def context_grading_node(state):
  print("---context_grading_node---")
  state.relevant_documents = []

  for x_document in state.context_documents:
    if state.sandbox == 1:
      state.relevant_documents.append(x_document)
    else:
      chain = get_context_grading_chain(state.llm)
      response = chain.invoke({"question": state.question, "context": x_document.page_content})
      print(f'---context documents: {response["score"]}---')

      if response['score'] == "yes":
        state.relevant_documents.append(x_document)

  return state
# -------------------------------------------------------------

def rewrite_question_node(state):
  print("---rewrite_question_node---")

  context = ". ".join([x_document.page_content for x_document in state.context_documents])
  chain = get_rewrite_question_chain(state.llm)
  response = chain.invoke({"question": state.question, "context": context})
  print(f'---new_question: {response}---')

  state.question_rewritten = True
  state.question = response
  return state
# -------------------------------------------------------------

def rag_search_node(state):
  print("---rag_search_node---")

  if state.sandbox == 1:
    state.generation = "Automatic sandbox response."
  else:
    context = "\n\n".join([x_document.page_content for x_document in state.relevant_documents])
    chain = get_rag_search_chain(state.llm)
    response = chain.invoke({"question": state.question, "context": context})
    state.generation = response

  return state
# -------------------------------------------------------------

def dont_know_node(state):
  print("---dont_know_node---")

  state.generation = "I don't know. Perhaps your question is not related with my context knowledge?"
  return state
# -------------------------------------------------------------

def chatToLlm(question, sandbox):
  graph = None
  state = None

  if sandbox == 1:
    graph = StateGraph(GraphStateSandBox)
    state = {"question": question}
  else:
    graph = StateGraph(GraphState)
    state = {"llm": getLlmModel(sandbox), "question": question}

  graph.add_node("context_retriever_node", context_retriever_node)
  graph.add_node("context_grading_node", context_grading_node)
  graph.add_node("rewrite_question_node", rewrite_question_node)
  graph.add_node("rag_search_node", rag_search_node)
  graph.add_node("dont_know_node", dont_know_node)

  graph.add_edge(START, "context_retriever_node")

  graph.add_conditional_edges(
    "context_retriever_node",
    lambda state: "Question is in context" if len(state.context_documents) > 0 else "Question is out of context",
    {
      "Question is out of context": "dont_know_node",
      "Question is in context": "context_grading_node"
    },
  )

  graph.add_conditional_edges(
    "context_grading_node",
    lambda state: "Relevant context found" if len(state.relevant_documents) > 0 else ("Unknown knowledge for rewritten question" if state.question_rewritten else "Unknown knowledge for original question"),
    {
      "Relevant context found": "rag_search_node",
      "Unknown knowledge for original question": "rewrite_question_node",
      "Unknown knowledge for rewritten question": "dont_know_node"
    },
  )

  graph.add_edge("rewrite_question_node", "context_retriever_node")
  graph.add_edge("rag_search_node", END)
  graph.add_edge("dont_know_node", END)

  graph = graph.compile()

  if sandbox == 1:
    graph_image = graph.get_graph().draw_mermaid_png(draw_method=MermaidDrawMethod.API)
    with open(join(os.path.dirname(__file__), '..', 'graph.png'), "wb") as graph_png:
      graph_png.write(graph_image)

  result = graph.invoke(state)

  return {
    'response': result['generation'],
    'context_sources': result['relevant_documents']
  }
# -------------------------------------------------------------
