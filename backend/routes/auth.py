from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt
import os
import hashlib

router = APIRouter()
security = HTTPBearer()

# Configurações (use .env em produção)
SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "msd-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 horas

# Credenciais do admin (configure no .env)
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "msd2025")  # MUDE ISSO!


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


def hash_password(password: str) -> str:
    """Hash simples de senha (use bcrypt em produção real)"""
    return hashlib.sha256(password.encode()).hexdigest()


def create_access_token(data: dict) -> str:
    """Cria um JWT token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Verifica e decodifica o JWT token"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")


@router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: LoginRequest):
    """
    Login do admin
    """
    # Verifica credenciais
    if credentials.username != ADMIN_USERNAME:
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos")
    
    # Em produção real, use hash da senha armazenada
    if credentials.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos")
    
    # Cria token
    access_token = create_access_token(
        data={"sub": credentials.username, "role": "admin"}
    )
    
    return TokenResponse(access_token=access_token)


@router.get("/auth/verify")
async def verify_auth(payload: dict = Depends(verify_token)):
    """
    Verifica se o token é válido
    """
    return {
        "authenticated": True,
        "username": payload.get("sub"),
        "role": payload.get("role")
    }


@router.post("/auth/logout")
async def logout():
    """
    Logout (no backend não faz nada, o frontend deve deletar o token)
    """
    return {"message": "Logout realizado com sucesso"}
