from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config.config import settings
from config.database import engine, Base
from config.redis import RedisClient
from config.cloudinary import CloudinaryClient
from models import User
from utils.logger import logger
from utils import Colors
from routers.auth_router import auth_router


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
    
    # Connect to Redis
    logger.info("🔌 Connecting to Redis...")
    try:
        await RedisClient.get_redis()
        logger.info(f"✅ Redis connected at {settings.REDIS_HOST}:{settings.REDIS_PORT}")
    except Exception as e:
        logger.error(f"❌ Redis connection failed: {str(e)}")
    
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
    # Close Redis connection
    await RedisClient.close_connection()
    
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

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)

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



