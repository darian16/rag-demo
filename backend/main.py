from fastapi import FastAPI
from openai_llm.chat import chatToLlm
# -------------------------------------------------------------

tags_metadata = [
  {
    "name": "index",
    "description": "App description.",
  },
  {
    "name": "chat",
    "description": "Context OpenAI chat. For offline behavior use sandbox=1 parameter."
  }
]

app = FastAPI(
  title="RAG Demo",
  description="RAG Demo for contextual AI interactions.",
  version="2025.02.15",
  openapi_tags=tags_metadata
)

@app.get("/", tags=["index"])
def index():
  return {"service": "RAG Demo for contextual AI interactions."}
# -------------------------------------------------------------

@app.post("/chat", tags=["chat"])
def chat(question: str, sandbox: int = 0):
  return {"response": chatToLlm(question, sandbox)}
# -------------------------------------------------------------
