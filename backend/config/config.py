from typing import List
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings
from urllib.parse import urlparse
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    """Settings class để đọc từ .env file"""
    
    # App settings
    APP_NAME: str = Field("NextLap API", alias="APP_NAME")
    API_PREFIX: str = Field(..., alias="API_PREFIX")
    DEBUG: bool = Field(False, alias="DEBUG")
    VERSION: str = Field("1.0.0", alias="VERSION")
    DATABASE_URL: str = Field(..., alias="DATABASE_URL")
    SECRET_KEY: str = Field(..., alias="SECRET_KEY")    
    ALGORITHM: str = Field("HS256", alias="ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(30, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
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
    FRONTEND_URL: str = Field(..., alias="FRONTEND_URL")
    BACKEND_URL: str = Field(..., alias="BACKEND_URL")

    # Google settings
    GOOGLE_CLIENT_ID: str = Field(..., alias="GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET: str = Field(..., alias="GOOGLE_CLIENT_SECRET")
    GOOGLE_SERVER_METADATA_URL: str = Field(..., alias="GOOGLE_SERVER_METADATA_URL")
    GOOGLE_CLIENT_KWARGS: dict = Field(..., alias="GOOGLE_CLIENT_KWARGS")
    GOOGLE_REDIRECT_URI: AnyHttpUrl = Field(..., alias="GOOGLE_REDIRECT_URI")
    
    @field_validator("API_PREFIX", mode="before")
    def normalize_api_prefix(cls, v):
        if isinstance(v, str):
            if v.startswith("http://") or v.startswith("https://"):
                parsed = urlparse(v)
                path = parsed.path
                if not path or path == "/":
                    return "/api"
                return path if path.startswith("/") else "/" + path
            return v if v.startswith("/") else "/" + v
        return v
        
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()

