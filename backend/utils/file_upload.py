"""File upload utility for handling file uploads with Cloudinary"""
from fastapi import UploadFile
from config.cloudinary import CloudinaryClient
import mimetypes
from utils.logger import logger


class FileUploadService:
    """Service for handling file uploads to Cloudinary"""
    
    # Allowed file types for product images
    ALLOWED_IMAGE_TYPES = {
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    }
    
    # Maximum file size (10MB)
    MAX_FILE_SIZE = 10 * 1024 * 1024
    
    @classmethod
    async def upload_product_image(
        cls,
        file: UploadFile,
        product_id: int = None
    ) -> dict:
        """
        Upload a single product image to Cloudinary
        
        Args:
            file: UploadFile object from FastAPI
            product_id: Product ID (optional, for naming)
            
        Returns:
            dict: Upload result containing url and public_id
            
        Raises:
            ValueError: If file is invalid
        """
        # Validate file type
        if file.content_type not in cls.ALLOWED_IMAGE_TYPES:
            raise ValueError(
                f"Loại file không được hỗ trợ. Vui lòng upload ảnh (JPEG, PNG, GIF, WebP)"
            )
        
        # Validate file size
        content = await file.read()
        if len(content) > cls.MAX_FILE_SIZE:
            raise ValueError(
                f"File quá lớn. Kích thước tối đa là 10MB"
            )
        
        # Reset file position
        await file.seek(0)
        
        try:
            # Prepare upload parameters
            public_id = None
            if product_id:
                public_id = f"product_{product_id}_{file.filename}"
            
            # Upload to Cloudinary
            result = CloudinaryClient.upload_image(
                file.file,
                folder="products",
                public_id=public_id,
                resource_type="auto"
            )
            
            logger.info(f"Product image uploaded: {result.get('public_id')}")
            
            return {
                "url": result.get('secure_url'),
                "public_id": result.get('public_id'),
                "size": result.get('bytes'),
                "format": result.get('format')
            }
            
        except Exception as e:
            logger.error(f"Product image upload failed: {str(e)}")
            raise ValueError(f"Lỗi upload ảnh: {str(e)}")
    
    @classmethod
    async def upload_multiple_product_images(
        cls,
        files: list[UploadFile],
        product_id: int = None
    ) -> list[dict]:
        """
        Upload multiple product images to Cloudinary
        
        Args:
            files: List of UploadFile objects
            product_id: Product ID (optional, for naming)
            
        Returns:
            list[dict]: List of upload results
            
        Raises:
            ValueError: If any file is invalid
        """
        results = []
        errors = []
        
        for idx, file in enumerate(files):
            try:
                result = await cls.upload_product_image(file, product_id)
                results.append(result)
            except ValueError as e:
                errors.append({
                    "file": file.filename,
                    "error": str(e)
                })
        
        if errors:
            error_msg = "; ".join([f"{e['file']}: {e['error']}" for e in errors])
            logger.warning(f"Some files failed to upload: {error_msg}")
            raise ValueError(f"Lỗi upload một số ảnh: {error_msg}")
        
        return results
    
    @classmethod
    def extract_public_id_from_url(cls, url: str) -> str | None:
        """
        Extract Cloudinary public_id from image URL
        
        Args:
            url: Cloudinary image URL
            
        Returns:
            str: Public ID or None if cannot extract
            
        Example:
            URL: https://res.cloudinary.com/demo/image/upload/v1234567890/products/product_1_image.jpg
            Returns: products/product_1_image
        """
        try:
            if not url or 'cloudinary.com' not in url:
                return None
            
            # Split by '/upload/' to get the part after it
            parts = url.split('/upload/')
            if len(parts) < 2:
                return None
            
            # Get the path after version number (v1234567890)
            path_parts = parts[1].split('/')
            if len(path_parts) < 2:
                return None
            
            # Skip version number and join the rest
            public_id_with_ext = '/'.join(path_parts[1:])
            
            # Remove file extension
            public_id = public_id_with_ext.rsplit('.', 1)[0]
            
            logger.info(f"Extracted public_id: {public_id} from URL: {url}")
            return public_id
            
        except Exception as e:
            logger.error(f"Failed to extract public_id from URL: {str(e)}")
            return None


    @classmethod
    def delete_product_image(cls, public_id: str) -> bool:
        """
        Delete a product image from Cloudinary
        
        Args:
            public_id: Public ID of the image
            
        Returns:
            bool: True if deleted successfully
            
        Raises:
            ValueError: If deletion fails
        """
        try:
            result = CloudinaryClient.delete_file(public_id, resource_type="image")
            logger.info(f"Product image deleted: {public_id}")
            return True
        except Exception as e:
            logger.error(f"Product image deletion failed: {str(e)}")
            raise ValueError(f"Lỗi xóa ảnh: {str(e)}")


    @classmethod
    async def delete_multiple_product_images(cls, public_ids: list[str]) -> dict:
        """
        Delete multiple product images from Cloudinary
        
        Args:
            public_ids: List of public IDs
            
        Returns:
            dict: Summary of deletion results
        """
        success_count = 0
        failed_count = 0
        errors = []
        
        for public_id in public_ids:
            try:
                cls.delete_product_image(public_id)
                success_count += 1
            except ValueError as e:
                failed_count += 1
                errors.append({
                    "public_id": public_id,
                    "error": str(e)
                })
        
        result = {
            "success": success_count,
            "failed": failed_count,
            "total": len(public_ids)
        }
        
        if errors:
            result["errors"] = errors
            logger.warning(f"Some images failed to delete: {errors}")
        
        return result