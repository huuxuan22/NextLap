from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Settings class để đọc từ .env file"""
    
    # App settings
    APP_NAME: str = Field("NextLap API", alias="APP_NAME")
    DEBUG: bool = Field(False, alias="DEBUG")
    VERSION: str = Field("1.0.0", alias="VERSION")
    DATABASE_URL: str = Field(..., alias="DATABASE_URL")
    SECRET_KEY: str = Field(..., alias="SECRET_KEY")    
    ALGORITHM: str = Field("HS256", alias="ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(30, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    # CORS settings
    CORS_ORIGINS: List[str] = ["*"]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()

