"""
Cloudinary configuration và connection management
"""
import cloudinary
import cloudinary.uploader
import cloudinary.api
from config.config import settings
from utils.logger import logger


class CloudinaryClient:
    """Cloudinary client để quản lý kết nối và upload ảnh/video"""
    
    _initialized: bool = False
    
    @classmethod
    def initialize(cls):
        """
        Khởi tạo Cloudinary với cấu hình từ settings
        
        Raises:
            Exception: Nếu khởi tạo thất bại
        """
        if cls._initialized:
            return
        
        try:
            cloudinary.config(
                cloud_name=settings.CLOUDINARY_CLOUD_NAME,
                api_key=settings.CLOUDINARY_API_KEY,
                api_secret=settings.CLOUDINARY_API_SECRET,
                secure=settings.CLOUDINARY_SECURE
            )
            cls._initialized = True
            logger.info(f"✅ Cloudinary initialized (cloud: {settings.CLOUDINARY_CLOUD_NAME})")
        except Exception as e:
            logger.error(f"❌ Cloudinary initialization failed: {str(e)}")
            raise
    
    @classmethod
    def upload_image(cls, file, folder: str = None, public_id: str = None, **kwargs):
        """
        Upload ảnh lên Cloudinary
        
        Args:
            file: File object hoặc file path
            folder: Thư mục lưu trữ trên Cloudinary (optional)
            public_id: Public ID cho file (optional)
            **kwargs: Các tham số bổ sung cho upload (transformation, etc.)
        
        Returns:
            dict: Kết quả upload từ Cloudinary
        """
        if not cls._initialized:
            cls.initialize()
        
        upload_params = {}
        if folder:
            upload_params["folder"] = folder
        if public_id:
            upload_params["public_id"] = public_id
        upload_params.update(kwargs)
        
        try:
            result = cloudinary.uploader.upload(file, **upload_params)
            logger.info(f"✅ Image uploaded to Cloudinary: {result.get('public_id')}")
            return result
        except Exception as e:
            logger.error(f"❌ Cloudinary upload failed: {str(e)}")
            raise
    
    @classmethod
    def upload_video(cls, file, folder: str = None, public_id: str = None, **kwargs):
        """
        Upload video lên Cloudinary
        
        Args:
            file: File object hoặc file path
            folder: Thư mục lưu trữ trên Cloudinary (optional)
            public_id: Public ID cho file (optional)
            **kwargs: Các tham số bổ sung cho upload
        
        Returns:
            dict: Kết quả upload từ Cloudinary
        """
        if not cls._initialized:
            cls.initialize()
        
        upload_params = {"resource_type": "video"}
        if folder:
            upload_params["folder"] = folder
        if public_id:
            upload_params["public_id"] = public_id
        upload_params.update(kwargs)
        
        try:
            result = cloudinary.uploader.upload(file, **upload_params)
            logger.info(f"✅ Video uploaded to Cloudinary: {result.get('public_id')}")
            return result
        except Exception as e:
            logger.error(f"❌ Cloudinary video upload failed: {str(e)}")
            raise
    
    @classmethod
    def delete_file(cls, public_id: str, resource_type: str = "image"):
        """
        Xóa file từ Cloudinary
        
        Args:
            public_id: Public ID của file cần xóa
            resource_type: Loại resource ("image", "video", "raw")
        
        Returns:
            dict: Kết quả xóa từ Cloudinary
        """
        if not cls._initialized:
            cls.initialize()
        
        try:
            result = cloudinary.uploader.destroy(public_id, resource_type=resource_type)
            logger.info(f"✅ File deleted from Cloudinary: {public_id}")
            return result
        except Exception as e:
            logger.error(f"❌ Cloudinary delete failed: {str(e)}")
            raise
    
    @classmethod
    def get_image_url(cls, public_id: str, transformation: dict = None, **kwargs):
        """
        Lấy URL của ảnh từ Cloudinary
        
        Args:
            public_id: Public ID của ảnh
            transformation: Dict chứa các transformation (width, height, crop, etc.)
            **kwargs: Các tham số bổ sung
        
        Returns:
            str: URL của ảnh
        """
        if not cls._initialized:
            cls.initialize()
        
        try:
            url = cloudinary.CloudinaryImage(public_id).build_url(
                transformation=transformation,
                **kwargs
            )
            return url
        except Exception as e:
            logger.error(f"❌ Cloudinary URL generation failed: {str(e)}")
            raise
    
    @classmethod
    def is_initialized(cls) -> bool:
        """Kiểm tra xem Cloudinary đã được khởi tạo chưa"""
        return cls._initialized


# Dependency function để sử dụng trong FastAPI routes
def get_cloudinary():
    """
    Dependency function để lấy Cloudinary client.
    Sử dụng với FastAPI: cloudinary_client = Depends(get_cloudinary)
    
    Returns:
        CloudinaryClient: Cloudinary client instance
    """
    CloudinaryClient.initialize()
    return CloudinaryClient

