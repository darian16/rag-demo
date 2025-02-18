import pytest
from fastapi.testclient import TestClient
from main import app
# -------------------------------------------------------------

@pytest.fixture(scope="function")
def test_client():
  with TestClient(app) as test_client:
    yield test_client
# -------------------------------------------------------------

@pytest.fixture()
def chat_params():
  return {
    "question": "tmp",
    "sandbox": 1
  }
# -------------------------------------------------------------
