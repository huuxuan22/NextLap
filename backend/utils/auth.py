from typing import Any, Optional
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from config.config import settings
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

class TokenData(BaseModel):
    email: Optional[str] = None

def generate_token(data: dict[str, Any], exprices_delta: Optional[int] = None) -> str:
    to_encode = {}
    for key, value in data.items():
        if isinstance(value, datetime):
            to_encode[key] = value.isoformat()
        else:
            to_encode[key] = value
    exprice = datetime.now(timezone.utc) + timedelta(
        seconds=exprices_delta if exprices_delta else settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": int(exprice.timestamp())})
    encode_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encode_jwt

# giải mã token
def extract_all_claims(token: str) -> dict[str,Any]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Token không hợp lệ")

def extract_email(token: str) -> Optional[str]:
    claims = extract_all_claims(token)
    email = claims.get("email")
    return email

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def extract_id(token: str) -> Optional[str]:
    claims = extract_all_claims(token)
    user_id = claims.get("id")
    if not user_id:
        user_id = claims.get("sub")  
    return str(user_id) if user_id else None

def extract_role(token: str) -> str:
    claims = extract_all_claims(token)
    role = claims.get("role")
    if not role:
        raise HTTPException(status_code=401, detail="Không tìm thấy người dùng trong token")
    return role

# kiểm tra token hết hạn
def is_token_expired(token: str) -> bool:
    claims = extract_all_claims(token)
    ex_timestamp = claims.get("exp")
    if ex_timestamp is None:
        return True
    expiration = datetime.utcfromtimestamp(ex_timestamp)
    return datetime.utcnow() > expiration

# xác thực token - hỗ trợ cả case có email và không có email (Facebook)
def validate_token(token: str) -> dict[str,Any]:
    email = extract_email(token)
    user_id = extract_id(token)
    role = extract_role(token)
    
    # Phải có ít nhất id hoặc email, và phải có role
    if not user_id and not email:
        raise HTTPException(status_code=401, detail="Không tìm thấy người dùng trong token")
    if not role:
        raise HTTPException(status_code=401, detail="Không tìm thấy người dùng trong token")
    
    result = {"role": role}
    if user_id:
        result["id"] = user_id
    if email:
        result["email"] = email
    
    return result