from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from openai_llm.chat import chatToLlm
# -------------------------------------------------------------

tags_metadata = [
  {
    "name": "index",
    "description": "App description.",
  },
  {
    "name": "chat",
    "description": "In-context ChatGPT-based chat."
  }
]

app = FastAPI(
  title="RAG Demo",
  description="RAG Demo for contextual AI interactions.",
  version="2025.02.15",
  openapi_tags=tags_metadata
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/", tags=["index"])
async def index():
  return {"service": "RAG Demo for contextual AI interactions."}
# -------------------------------------------------------------

class ChatParams(BaseModel):
  question: str
  sandbox: int = 0
# -------------------------------------------------------------

@app.post("/chat", tags=["chat"])
async def chat(params: ChatParams):
  return chatToLlm(params.question, params.sandbox)
# -------------------------------------------------------------
