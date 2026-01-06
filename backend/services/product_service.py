from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import UploadFile
from datetime import datetime
from models.product import Product
from models.product_spec import ProductSpec
from schemas.product_schemas import ProductCreate
from utils.file_upload import FileUploadService
from utils.logger import logger


class ProductService:
    """Service class for product operations"""

    @staticmethod
    async def create_product(
        db: Session,
        product_data: ProductCreate,
        files: list[UploadFile] = None
    ) -> Product:
        """Create a new product with file uploads"""
        try:
            if product_data.price <= 0:
                raise ValueError("Giá sản phẩm phải lớn hơn 0")

            new_product = Product(
                name=product_data.name,
                brand_id=product_data.brand_id,
                price=product_data.price,
                description=product_data.description,
                is_deleted=False
            )

            db.add(new_product)
            db.flush()

            image_urls = []
            if files and len(files) > 0:
                try:
                    upload_results = await FileUploadService.upload_multiple_product_images(
                        files,
                        product_id=new_product.id
                    )
                    image_urls = [result['url'] for result in upload_results]
                    logger.info(f"Uploaded {len(image_urls)} images for product {new_product.id}")
                except ValueError as e:
                    db.rollback()
                    raise ValueError(f"Lỗi upload ảnh: {str(e)}")

            if product_data.spec:
                spec_images = product_data.spec.images or []
                all_images = spec_images + image_urls if image_urls else spec_images
                
                product_spec = ProductSpec(
                    product_id=new_product.id,
                    ram=product_data.spec.ram,
                    chip=product_data.spec.chip,
                    screen=product_data.spec.screen,
                    battery=product_data.spec.battery,
                    camera=product_data.spec.camera,
                    quantity_in_stock=product_data.spec.quantity_in_stock,
                    images=all_images if all_images else None
                )
                db.add(product_spec)
            elif image_urls:
                product_spec = ProductSpec(
                    product_id=new_product.id,
                    images=image_urls
                )
                db.add(product_spec)
            
            db.flush()
            db.commit()
            db.refresh(new_product)
            
            return new_product

        except Exception as e:
            db.rollback()
            raise

    @staticmethod
    def get_product_by_id(db: Session, product_id: int, include_deleted: bool = False) -> Product | None:
        """Get product by ID with specifications"""
        query = db.query(Product).filter(Product.id == product_id)
        
        if not include_deleted:
            query = query.filter(Product.is_deleted == False)
        
        return query.first()

    @staticmethod
    def get_all_products(
        db: Session,
        skip: int = 0,
        limit: int = 10,
        search: str | None = None,
        brand_id: int | None = None,
        include_deleted: bool = False
    ) -> list[Product]:
        """Get all products with optional filters"""
        query = db.query(Product)

        filters = []
        if not include_deleted:
            filters.append(Product.is_deleted == False)
        if search is not None and search.strip():
            filters.append(Product.name.ilike(f"%{search.strip()}%"))
        if brand_id is not None:
            filters.append(Product.brand_id == brand_id)

        if filters:
            query = query.filter(and_(*filters))

        return query.offset(skip).limit(limit).all()

    @staticmethod
    def get_products_count(
        db: Session,
        search: str | None = None,
        brand_id: int | None = None,
        include_deleted: bool = False
    ) -> int:
        """Get total count of products with optional filters"""
        query = db.query(Product)

        filters = []
        if not include_deleted:
            filters.append(Product.is_deleted == False)
        if search is not None and search.strip():
            filters.append(Product.name.ilike(f"%{search.strip()}%"))
        if brand_id is not None:
            filters.append(Product.brand_id == brand_id)

        if filters:
            query = query.filter(and_(*filters))

        return query.count()

    @staticmethod
    async def update_product_with_files(
        db: Session,
        product_id: int,
        product_data: ProductCreate,
        files: list[UploadFile] = None,
        keep_old_images: bool = False
    ) -> Product | None:
        """
        Update an existing product with file uploads
        
        Args:
            db: Database session
            product_id: Product ID
            product_data: Updated product data
            files: List of new image files (optional)
            keep_old_images: If True, keep old images and append new ones
            
        Returns:
            Updated Product instance or None if not found
            
        Raises:
            ValueError: If product data or files are invalid
        """
        try:
            # Get existing product
            product = db.query(Product).filter(
                Product.id == product_id,
                Product.is_deleted == False
            ).first()
            
            if not product:
                return None

            # Validate price
            if product_data.price <= 0:
                raise ValueError("Giá sản phẩm phải lớn hơn 0")

            # Update basic product fields
            product.name = product_data.name
            product.brand_id = product_data.brand_id
            product.price = product_data.price
            product.description = product_data.description

            db.flush()

            # Handle image updates
            old_images = []
            new_image_urls = []
            
            if product.spec and product.spec.images:
                old_images = product.spec.images if isinstance(product.spec.images, list) else []

            # Upload new files if provided
            if files and len(files) > 0:
                try:
                    upload_results = await FileUploadService.upload_multiple_product_images(
                        files,
                        product_id=product.id
                    )
                    new_image_urls = [result['url'] for result in upload_results]
                    logger.info(f"Uploaded {len(new_image_urls)} new images for product {product.id}")
                    
                    # Delete old images from Cloudinary if not keeping them
                    if not keep_old_images and old_images:
                        deleted_count = 0
                        for old_image_url in old_images:
                            try:
                                # Extract public_id from Cloudinary URL
                                public_id = FileUploadService.extract_public_id_from_url(old_image_url)
                                if public_id:
                                    FileUploadService.delete_product_image(public_id)
                                    deleted_count += 1
                            except Exception as e:
                                logger.warning(f"Failed to delete old image: {str(e)}")
                        
                        if deleted_count > 0:
                            logger.info(f"Deleted {deleted_count} old images from Cloudinary")
                    
                except ValueError as e:
                    db.rollback()
                    raise ValueError(f"Lỗi upload ảnh: {str(e)}")

            # Determine final image list
            if new_image_urls:
                if keep_old_images:
                    # Keep old images and append new ones
                    final_images = old_images + new_image_urls
                else:
                    # Replace with new images only
                    final_images = new_image_urls
            else:
                # No new files, keep old images
                final_images = old_images

            # Update or create product specification
            if product.spec:
                # Update existing spec
                if product_data.spec:
                    product.spec.ram = product_data.spec.ram
                    product.spec.chip = product_data.spec.chip
                    product.spec.screen = product_data.spec.screen
                    product.spec.battery = product_data.spec.battery
                    product.spec.camera = product_data.spec.camera
                    product.spec.quantity_in_stock = product_data.spec.quantity_in_stock
                product.spec.images = final_images if final_images else None
            else:
                # Create new spec if it doesn't exist
                if product_data.spec or final_images:
                    product_spec = ProductSpec(
                        product_id=product.id,
                        ram=product_data.spec.ram if product_data.spec else None,
                        chip=product_data.spec.chip if product_data.spec else None,
                        screen=product_data.spec.screen if product_data.spec else None,
                        battery=product_data.spec.battery if product_data.spec else None,
                        camera=product_data.spec.camera if product_data.spec else None,
                        quantity_in_stock=product_data.spec.quantity_in_stock if product_data.spec else 0,
                        images=final_images if final_images else None
                    )
                    db.add(product_spec)

            db.commit()
            db.refresh(product)
            return product

        except Exception as e:
            db.rollback()
            raise

    @staticmethod
    def soft_delete_product(db: Session, product_id: int) -> bool:
        """
        Soft delete a product (mark as deleted instead of removing)
        
        Args:
            db: Database session
            product_id: Product ID
            
        Returns:
            True if product was soft deleted, False if not found
        """
        try:
            product = db.query(Product).filter(
                Product.id == product_id,
                Product.is_deleted == False
            ).first()
            
            if not product:
                return False

            product.is_deleted = True
            product.deleted_at = datetime.utcnow()
            
            db.commit()
            return True

        except Exception as e:
            db.rollback()
            raise

    @staticmethod
    def restore_product(db: Session, product_id: int) -> bool:
        """
        Restore a soft deleted product
        
        Args:
            db: Database session
            product_id: Product ID
            
        Returns:
            True if product was restored, False if not found
        """
        try:
            product = db.query(Product).filter(
                Product.id == product_id,
                Product.is_deleted == True
            ).first()
            
            if not product:
                return False

            product.is_deleted = False
            product.deleted_at = None
            
            db.commit()
            return True

        except Exception as e:
            db.rollback()
            raise

    @staticmethod
    def hard_delete_product(db: Session, product_id: int) -> bool:
        """
        Permanently delete a product (use with caution)
        
        Args:
            db: Database session
            product_id: Product ID
            
        Returns:
            True if product was deleted, False if not found
        """
        try:
            product = db.query(Product).filter(Product.id == product_id).first()
            
            if not product:
                return False

            db.delete(product)
            db.commit()
            return True

        except Exception as e:
            db.rollback()
            raise