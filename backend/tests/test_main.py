def test_index(test_client):
  response = test_client.get("/")
  assert response.status_code == 200
# -------------------------------------------------------------

def test_chat(test_client, chat_params):
  response = test_client.post("/chat", json=chat_params)
  assert response.status_code == 200
# -------------------------------------------------------------
