def test_index(test_client):
  response = test_client.get("/")
  assert response.status_code == 200
# -------------------------------------------------------------

def test_chat(test_client):
  response = test_client.post("/chat", json={
    "question": "Why is the sky blue?",
    "sandbox": 1
  })

  assert response.status_code == 200
# -------------------------------------------------------------
