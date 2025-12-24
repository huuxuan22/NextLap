"""
Redis configuration và connection management
"""
import redis.asyncio as aioredis
from typing import Optional
from config.config import settings
from utils.logger import logger


class RedisClient:
    """Redis client singleton để quản lý kết nối Redis"""
    
    _instance: Optional[aioredis.Redis] = None
    
    @classmethod
    async def get_redis(cls) -> aioredis.Redis:
        """
        Lấy Redis connection instance (singleton pattern)
        
        Returns:
            aioredis.Redis: Redis client instance
        """
        if cls._instance is None:
            cls._instance = await cls._create_connection()
        return cls._instance
    
    @classmethod
    async def _create_connection(cls) -> aioredis.Redis:
        """
        Tạo kết nối Redis mới
        
        Returns:
            aioredis.Redis: Redis client instance
        """
        try:
            # Build Redis URL - handle empty password
            if settings.REDIS_PASSWORD:
                redis_url = f"redis://:{settings.REDIS_PASSWORD}@{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_DB}"
            else:
                redis_url = f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_DB}"
            
            redis_client = aioredis.from_url(
                redis_url,
                encoding="utf-8",
                decode_responses=settings.REDIS_DECODE_RESPONSES,
            )
            
            # Test connection
            await redis_client.ping()
            
            return redis_client
        except Exception as e:
            logger.error(f"❌ Redis connection error: {str(e)}")
            raise
    
    @classmethod
    async def close_connection(cls):
        """Đóng kết nối Redis"""
        if cls._instance:
            await cls._instance.aclose()
            cls._instance = None
            logger.info("🔌 Redis connection closed")
    
    @classmethod
    async def ping(cls) -> bool:
        """
        Kiểm tra kết nối Redis
        
        Returns:
            bool: True nếu kết nối thành công, False nếu không
        """
        try:
            redis_client = await cls.get_redis()
            await redis_client.ping()
            return True
        except Exception:
            return False


# Dependency function để sử dụng trong FastAPI routes
async def get_redis() -> aioredis.Redis:
    """
    Dependency function để lấy Redis client.
    Sử dụng với FastAPI: redis_client: Redis = Depends(get_redis)
    
    Returns:
        aioredis.Redis: Redis client instance
    """
    return await RedisClient.get_redis()

