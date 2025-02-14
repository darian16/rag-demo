import os
from os import listdir
from os.path import join

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain_community.document_loaders import PyPDFLoader
# -------------------------------------------------------------

def calc_int_percent(value, total):
  if not total: return 0
  return int(value/float(total)*100)
# -------------------------------------------------------------

def genVectorStoreContext():
  files_dir = join(os.path.dirname(__file__), 'pages')
  vectorial_dir = join(os.path.dirname(__file__))
  collection_name = 'store'
  gpt_embebber = GPT4AllEmbeddings(gpt4all_kwargs= {'allow_download':False})

  if os.path.isfile(join(vectorial_dir, 'chroma.sqlite3')):
    print("Context vectorial database already exists!")

    return Chroma(
      persist_directory=vectorial_dir,
      collection_name=collection_name,
      embedding_function=gpt_embebber
    ).as_retriever()

  print("Creating vectorial database file...")

  vectorstore = Chroma(
    persist_directory=vectorial_dir,
    collection_name=collection_name,
    embedding_function=gpt_embebber
  )

  print("Retrieving Context documents...")

  for x_file in listdir(files_dir):
    print(f'   => {x_file}...')

    metadata = x_file.split('-page')
    document_name = metadata[0] + '.pdf'
    document_page = int(metadata[1].replace('.pdf', ''))

    loader = PyPDFLoader(join(files_dir, x_file))

    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
      chunk_size=250,
      chunk_overlap=25
    )

    documents = []
    documents.extend(loader.load())
    documents = text_splitter.split_documents(documents)
    sections_count = len(documents)

    if sections_count > 0:
      prev_section = 0

      for x_index, x_document in enumerate(documents):
        current_section = x_index+1

        x_document.metadata['document_name'] = document_name
        x_document.metadata['document_page'] = document_page
        x_document.metadata['page_section_percent'] = f'{calc_int_percent(prev_section, sections_count)}-{calc_int_percent(current_section, sections_count)}'

        prev_section = current_section

      vectorstore.add_documents(documents)
    else:
      print("No documents found...")

  print("Context vectorial database has been created!")
  print("")
  print("")

  return vectorstore.as_retriever()
# -------------------------------------------------------------

retriever = genVectorStoreContext()
print(f'Related documents for test question: {len(retriever.invoke("What is Cash from operations for?"))}')
#print(f'Related documents for test question: {retriever.invoke("what is Cash from operations for?")}')
# -------------------------------------------------------------
