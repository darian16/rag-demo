import sys

if sys.platform != 'win32':
  sys.modules['sqlite3'] = __import__('pysqlite3')

import os
from os.path import join

from langchain_chroma import Chroma
from langchain_community.embeddings import GPT4AllEmbeddings
# -------------------------------------------------------------

base_dir = join(os.path.dirname(__file__), 'context')
gpt_embebber = GPT4AllEmbeddings()

vectorstore = Chroma(
  persist_directory=base_dir,
  collection_name='store',
  embedding_function=gpt_embebber
)
# -------------------------------------------------------------

print("GPT4AllEmbeddings initialized!" if vectorstore else "ERROR: GPT4AllEmbeddings could not be initialized...")
# -------------------------------------------------------------
