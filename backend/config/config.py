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
    
    # Cloudinary settings
    CLOUDINARY_CLOUD_NAME: str = Field(..., alias="CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY: str = Field(..., alias="CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET: str = Field(..., alias="CLOUDINARY_API_SECRET")
    CLOUDINARY_SECURE: bool = Field(True, alias="CLOUDINARY_SECURE")
    # Email settings
    MAIL_SERVER: str = Field("smtp.gmail.com", alias="MAIL_SERVER")
    MAIL_PORT: int = Field(587, alias="MAIL_PORT")
    MAIL_USERNAME: str = Field(..., alias="MAIL_USERNAME")
    MAIL_PASSWORD: str = Field(..., alias="MAIL_PASSWORD")
    MAIL_USE_TLS: bool = Field(True, alias="MAIL_USE_TLS")
    MAIL_USE_SSL: bool = Field(False, alias="MAIL_USE_SSL")
    MAIL_FROM: str = Field(..., alias="MAIL_FROM")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()

