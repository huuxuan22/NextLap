from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config.config import settings
from config.database import engine, Base
from config.cloudinary import CloudinaryClient
from models import User
from utils.logger import logger
from utils import Colors
from utils.email import sendmail
from controllers.auth_controller import auth_router
from middleware.auth_midleware import AuthMiddleware
from fastapi import HTTPException, status
from pydantic import BaseModel, EmailStr
from controllers.brand_controller import brand_router
from controllers.user_controller import user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup và shutdown events"""
    # Startup
    logger.show_banner()
    
    # Connect to database
    logger.info("🔌 Connecting to database...")
    try:
        from sqlalchemy import text
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            # Extract database info from URL
            db_url = settings.DATABASE_URL
            if '@' in db_url:
                db_info = db_url.split('@')[-1]
                logger.database_connected(f"MySQL at {db_info}")
            else:
                logger.database_connected()
    except Exception as e:
        logger.database_error(str(e))
    
    # Initialize Cloudinary
    logger.info("🔌 Initializing Cloudinary...")
    try:
        CloudinaryClient.initialize()
    except Exception as e:
        logger.error(f"❌ Cloudinary initialization failed: {str(e)}")
    
    # Show API documentation URLs
    print(f"\n{Colors.BRIGHT_CYAN}{'='*70}{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}📚 API Documentation:{Colors.RESET}")
    print(f"{Colors.WHITE}   Swagger UI: {Colors.BRIGHT_BLUE}http://127.0.0.1:8000/docs{Colors.RESET}")
    print(f"{Colors.WHITE}   ReDoc:      {Colors.BRIGHT_BLUE}http://127.0.0.1:8000/redoc{Colors.RESET}")
    print(f"{Colors.BRIGHT_CYAN}{'='*70}{Colors.RESET}\n")
    
    yield
    
    # Shutdown
    print(f"\n{Colors.BRIGHT_RED}{'='*70}{Colors.RESET}")
    print(f"{Colors.BRIGHT_RED}🛑 NEXTLAP API SHUTTING DOWN{Colors.RESET}")
    print(f"{Colors.BRIGHT_RED}{'='*70}{Colors.RESET}\n")


# Khởi tạo FastAPI app
app = FastAPI(
    title="NEXTLAP API",
    description="NextLap API - FastAPI với mô hình MVC",
    version=settings.VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan
)

# Cấu hình CORS (phải thêm trước AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cấu hình Auth Middleware (xác thực người dùng)
app.add_middleware(AuthMiddleware)

# Include auth router
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(brand_router, prefix=settings.API_PREFIX)
app.include_router(user_router, prefix=settings.API_PREFIX)

@app.get("/")
async def root():
    return {
        "message": "Welcome to NextLap API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# Email endpoint example
class EmailRequest(BaseModel):
    """Schema cho request gửi email"""
    to_email: EmailStr
    subject: str
    content: str
    title: str = None


@app.post("/send-mail")
async def send_mail(request: EmailRequest):
    """
    API endpoint để gửi email với HTML template đẹp
    
    Args:
        request: EmailRequest chứa:
            - to_email: Địa chỉ email người nhận
            - subject: Tiêu đề email
            - content: Nội dung email (HTML)
            - title: Tiêu đề hiển thị trong email (optional)
    
    Returns:
        dict: Kết quả gửi email
    """
    try:
        result = await sendmail(
            to_email=request.to_email,
            subject=request.subject,
            content=request.content,
            title=request.title
        )
        
        if result["success"]:
            return result
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result.get("error", "Failed to send email")
            )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Unexpected error in send_mail endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )



