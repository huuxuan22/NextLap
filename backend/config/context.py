import uuid
from contextvars import ContextVar
from http.client import HTTPException
from typing import Optional, Dict, Any
from fastapi import HTTPException, status
from urllib3 import request

request_id: ContextVar[uuid.UUID] = ContextVar(
    "request_id", default=uuid.UUID("00000000-0000-0000-0000-000000000000")
)

current_email: ContextVar[Optional[str]] = ContextVar("current_email", default=None)
current_user: ContextVar[Optional[Dict[str, Any]]] = ContextVar("current_user", default=None)
token_user: ContextVar[dict] = ContextVar("token_user", default=None)

def get_current_user() -> dict:
    user = current_user.get()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return user