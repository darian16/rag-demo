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
from pydantic import BaseModel
from langgraph.graph import START, END
from langgraph.graph import StateGraph

from langchain_core.runnables.graph import MermaidDrawMethod
# -------------------------------------------------------------

class GraphStateSandBox(BaseModel):
  sandbox: int = 1
  question: str = ""
  documents: list = []
  generation: str = ""
# -------------------------------------------------------------

class GraphState(BaseModel):
  sandbox: int = 0
  llm: ChatOpenAI = None
  question: str = ""
  documents: list = []
  generation: str = ""
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

  return vectorstore.as_retriever(search_kwargs={"k": 3})
# -------------------------------------------------------------

def get_context_grading_chain(llm):
  prompt = ChatPromptTemplate.from_template(
    """You are a grader assessing relevance 
    of a retrieved document to a user question. If the document contains keywords related to the user question, grade it as relevant. \n
    It does not need to be a stringent test. The goal is to filter out erroneous retrievals. \n
    Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question. \n
    Provide the binary score as a JSON with a single key 'score' and no premable or explaination.
    Here is the retrieved document: \n\n {context} \n\n
    Here is the user question: {question}"""
  )

  return prompt | llm | JsonOutputParser()
# -------------------------------------------------------------

def get_rag_search_chain(llm):
  prompt = ChatPromptTemplate.from_template(
    """You are an assistant for question-answering tasks. \n
    Use the following pieces of retrieved context to answer the question. \n
    If you don't know the answer, just say that you don't know. \n
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

  state.documents = retriever.invoke(state.question)
  print(f'---documents count: {len(state.documents)}---')

  return state
# -------------------------------------------------------------

def context_grading_node(state):
  print("---context_grading_node---")
  relevant_documents = []

  for x_document in state.documents:
    if state.sandbox == 1:
      relevant_documents.append(x_document)
    else:
      chain = get_context_grading_chain(state.llm)
      response = chain.invoke({"question": state.question, "context": x_document.page_content})
      print(f'---context documents: {response["score"]}---')

      if response['score'] == "yes":
        relevant_documents.append(x_document)

  state.documents = relevant_documents
  return state
# -------------------------------------------------------------

def rag_search_node(state):
  print("---rag_search_node---")

  if state.sandbox == 1:
    state.generation = "Automatic sandbox response."
  else:
    context = "\n\n".join([x_document.page_content for x_document in state.documents])
    chain = get_rag_search_chain(state.llm)
    response = chain.invoke({"question": state.question, "context": context})
    state.generation = response

  return state
# -------------------------------------------------------------

def dont_know_node(state):
  print("---dont_know_node---")

  state.generation = "I don't know. Perhaps your query is not associated with my context knowledge?"
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
  graph.add_node("rag_search_node", rag_search_node)
  graph.add_node("dont_know_node", dont_know_node)

  graph.add_edge(START, "context_retriever_node")

  graph.add_conditional_edges(
    "context_retriever_node",
    lambda state: "context_grading_node" if len(state.documents) > 0 else "dont_know_node",
    {
      "context_grading_node": "context_grading_node",
      "dont_know_node": "dont_know_node",
    },
  )

  graph.add_conditional_edges(
    "context_grading_node",
    lambda state: "rag_search_node" if len(state.documents) > 0 else "dont_know_node",
    {
      "rag_search_node": "rag_search_node",
      "dont_know_node": "dont_know_node",
    },
  )

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
    'context_sources': result['documents']
  }
# -------------------------------------------------------------
