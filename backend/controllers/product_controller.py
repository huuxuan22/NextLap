"""Product Controller - RESTful endpoints for product operations"""
from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File, Form, Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List, Optional
import json
from config.database import get_db
from schemas.product_schemas import (
    ProductCreate,
    ProductResponse,
    ProductDetailResponse,
    ProductSpecCreate
)
from schemas.base_schema import DataResponse
from services.product_service import ProductService
from middleware.auth_midleware import authenticate_user, check_admin


product_router = APIRouter(
    prefix="/products",
    tags=["products"]
)

@product_router.post(
    "",
    response_model=DataResponse[ProductResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create a new product with file uploads",
    description="Create a new product with form-data including image files - Admin only"
)
async def create_product(
    request: Request,
    name: str = Form(..., min_length=1, max_length=150, description="Product name"),
    price: float = Form(..., gt=0, description="Product price"),
    brand_id: Optional[int] = Form(None, description="Brand ID"),
    description: Optional[str] = Form(None, description="Product description"),
    quantity_in_stock: int = Form(0, ge=0, description="Quantity in stock"),
    ram: Optional[str] = Form(None, max_length=20, description="RAM specification"),
    chip: Optional[str] = Form(None, max_length=100, description="Chip/Processor specification"),
    screen: Optional[str] = Form(None, max_length=100, description="Screen specification"),
    battery: Optional[str] = Form(None, max_length=50, description="Battery specification"),
    camera: Optional[str] = Form(None, max_length=150, description="Camera specification"),
    files: List[UploadFile] = File(None, description="Product images"),
    db: Session = Depends(get_db)
):
    """
    Create a new product with file uploads via form-data - Admin only.
    
    Form parameters:
    - **name**: Product name (required, max 150 characters)
    - **price**: Product price (required, must be > 0)
    - **brand_id**: Brand ID (optional)
    - **description**: Product description (optional)
    - **quantity_in_stock**: Quantity in stock (default: 0)
    - **ram**: RAM specification (optional)
    - **chip**: Chip/Processor specification (optional)
    - **screen**: Screen specification (optional)
    - **battery**: Battery specification (optional)
    - **camera**: Camera specification (optional)
    - **files**: Image files (optional, multiple files supported)
    
    Returns:
        - **201**: Product created successfully with image URLs in spec.images
        - **400**: Bad request (invalid data or file upload error)
        - **403**: Forbidden - Admin only
        - **500**: Internal server error
    """
    # Check authentication and authorization
    await authenticate_user(request)
    await check_admin(request)
    
    try:
        # Validate name is not empty
        if not name or not name.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Tên sản phẩm không được để trống"
            )

        # Validate price
        if price <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Giá sản phẩm phải lớn hơn 0"
            )

        # Create spec object if any spec field is provided
        spec = None
        if any([ram, chip, screen, battery, camera, quantity_in_stock > 0, files]):
            spec = ProductSpecCreate(
                ram=ram,
                chip=chip,
                screen=screen,
                battery=battery,
                camera=camera,
                quantity_in_stock=quantity_in_stock
            )

        # Create product data object
        product_data = ProductCreate(
            name=name,
            price=price,
            brand_id=brand_id,
            description=description,
            spec=spec
        )

        # Create product with file uploads
        new_product = await ProductService.create_product(
            db,
            product_data,
            files=files if files else None
        )

        return DataResponse.custom_response(
            data=new_product,
            code="201",
            message="Sản phẩm đã được tạo thành công cùng với ảnh"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except IntegrityError as e:
        db.rollback()
        if "foreign key" in str(e.orig).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="ID brand không tồn tại"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Lỗi cơ sở dữ liệu đã xảy ra"
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )



@product_router.get(
    "/{product_id}",
    response_model=DataResponse[ProductDetailResponse],
    status_code=status.HTTP_200_OK,
    summary="Get product by ID",
    description="Retrieve a specific product with its specifications"
)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Get product details by product ID.
    
    - **product_id**: Product ID (path parameter, required)
    
    Returns:
        - **200**: Product found
        - **404**: Product not found
        - **500**: Internal server error
    """
    try:
        product = ProductService.get_product_by_id(db, product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Sản phẩm với ID {product_id} không tồn tại"
            )

        return DataResponse.custom_response(
            data=product,
            code="200",
            message="Lấy sản phẩm thành công"
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )


@product_router.get(
    "",
    response_model=DataResponse[list[ProductResponse]],
    status_code=status.HTTP_200_OK,
    summary="Get all products",
    description="Retrieve a list of all products with pagination and filtering"
)
async def get_products(
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(10, ge=1, le=100, description="Maximum items to return"),
    search: str | None = Query(None, description="Search by product name"),
    brand_id: int | None = Query(None, description="Filter by brand ID"),
    db: Session = Depends(get_db)
):
    """
    Get all products with pagination and optional filtering.
    
    Query parameters:
    - **skip**: Number of products to skip (default: 0)
    - **limit**: Maximum number of products to return (default: 10, max: 100)
    - **search**: Search by product name (optional, case-insensitive)
    - **brand_id**: Filter by brand ID (optional)
    
    Returns:
        - **200**: List of products
        - **500**: Internal server error
    """
    try:
        products = ProductService.get_all_products(
            db,
            skip=skip,
            limit=limit,
            search=search,
            brand_id=brand_id
        )

        total = ProductService.get_products_count(
            db,
            search=search,
            brand_id=brand_id
        )

        # Calculate pagination info
        pagination = {
            "skip": skip,
            "limit": limit,
            "total": total,
            "current_page": (skip // limit) + 1,
            "total_pages": (total + limit - 1) // limit,
            "has_next": (skip + limit) < total,
            "has_prev": skip > 0
        }

        # Custom response with pagination info
        return DataResponse.custom_response(
            data=products,
            code="200",
            message=f"Lấy danh sách sản phẩm thành công (tổng: {total})",
            pagination=pagination
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )


@product_router.put(
    "/{product_id}",
    response_model=DataResponse[ProductResponse],
    status_code=status.HTTP_200_OK,
    summary="Update a product with file uploads",
    description="Update product information with form-data including new image files - Admin only"
)
async def update_product(
    request: Request,
    product_id: int,
    name: str = Form(..., min_length=1, max_length=150, description="Product name"),
    price: float = Form(..., gt=0, description="Product price"),
    brand_id: Optional[int] = Form(None, description="Brand ID"),
    description: Optional[str] = Form(None, description="Product description"),
    quantity_in_stock: int = Form(0, ge=0, description="Quantity in stock"),
    ram: Optional[str] = Form(None, max_length=20, description="RAM specification"),
    chip: Optional[str] = Form(None, max_length=100, description="Chip/Processor specification"),
    screen: Optional[str] = Form(None, max_length=100, description="Screen specification"),
    battery: Optional[str] = Form(None, max_length=50, description="Battery specification"),
    camera: Optional[str] = Form(None, max_length=150, description="Camera specification"),
    files: List[UploadFile] = File(None, description="New product images (will replace old images)"),
    keep_old_images: bool = Form(False, description="Keep old images when uploading new ones"),
    db: Session = Depends(get_db)
):
    """
    Update a product with file uploads via form-data - Admin only.
    
    Form parameters:
    - **name**: Product name (required, max 150 characters)
    - **price**: Product price (required, must be > 0)
    - **brand_id**: Brand ID (optional)
    - **description**: Product description (optional)
    - **quantity_in_stock**: Quantity in stock (default: 0)
    - **ram**: RAM specification (optional)
    - **chip**: Chip/Processor specification (optional)
    - **screen**: Screen specification (optional)
    - **battery**: Battery specification (optional)
    - **camera**: Camera specification (optional)
    - **files**: New image files (optional, will replace old images by default)
    - **keep_old_images**: If True, keep old images and append new ones (default: False)
    
    Returns:
        - **200**: Product updated successfully
        - **404**: Product not found
        - **400**: Bad request (invalid data)
        - **403**: Forbidden - Admin only
        - **500**: Internal server error
    """
    # Check authentication and authorization
    await authenticate_user(request)
    await check_admin(request)
    
    try:
        # Check if product exists
        product = ProductService.get_product_by_id(db, product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Sản phẩm với ID {product_id} không tồn tại"
            )

        # Validate name is not empty
        if not name or not name.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Tên sản phẩm không được để trống"
            )

        # Validate price
        if price <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Giá sản phẩm phải lớn hơn 0"
            )

        # Create spec object
        spec = ProductSpecCreate(
            ram=ram,
            chip=chip,
            screen=screen,
            battery=battery,
            camera=camera,
            quantity_in_stock=quantity_in_stock
        )

        # Create product data object
        product_data = ProductCreate(
            name=name,
            price=price,
            brand_id=brand_id,
            description=description,
            spec=spec
        )

        # Update product with file uploads
        updated_product = await ProductService.update_product_with_files(
            db,
            product_id,
            product_data,
            files=files if files else None,
            keep_old_images=keep_old_images
        )

        return DataResponse.custom_response(
            data=updated_product,
            code="200",
            message="Sản phẩm đã được cập nhật thành công"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )


@product_router.delete(
    "/{product_id}",
    response_model=DataResponse,
    status_code=status.HTTP_200_OK,
    summary="Soft delete a product",
    description="Mark a product as deleted (soft delete) - Admin only"
)
async def delete_product(
    request: Request,
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Soft delete a product (mark as deleted, not permanently remove) - Admin only.
    
    - **product_id**: Product ID (path parameter, required)
    
    Returns:
        - **200**: Product soft deleted successfully
        - **404**: Product not found
        - **403**: Forbidden - Admin only
        - **500**: Internal server error
    """
    # Check authentication and authorization
    await authenticate_user(request)
    await check_admin(request)
    
    try:
        deleted = ProductService.soft_delete_product(db, product_id)

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Sản phẩm với ID {product_id} không tồn tại hoặc đã bị xóa"
            )

        return DataResponse.custom_response(
            data=None,
            code="200",
            message="Sản phẩm đã được xóa thành công"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )


@product_router.post(
    "/{product_id}/restore",
    response_model=DataResponse[ProductResponse],
    status_code=status.HTTP_200_OK,
    summary="Restore a soft deleted product",
    description="Restore a product that was previously soft deleted - Admin only"
)
async def restore_product(
    request: Request,
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Restore a soft deleted product - Admin only.
    
    - **product_id**: Product ID (path parameter, required)
    
    Returns:
        - **200**: Product restored successfully
        - **404**: Product not found or not deleted
        - **403**: Forbidden - Admin only
        - **500**: Internal server error
    """
    # Check authentication and authorization
    await authenticate_user(request)
    await check_admin(request)
    
    try:
        restored = ProductService.restore_product(db, product_id)

        if not restored:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Sản phẩm với ID {product_id} không tồn tại hoặc chưa bị xóa"
            )

        product = ProductService.get_product_by_id(db, product_id, include_deleted=False)

        return DataResponse.custom_response(
            data=product,
            code="200",
            message="Sản phẩm đã được khôi phục thành công"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )


@product_router.delete(
    "/{product_id}/permanent",
    response_model=DataResponse,
    status_code=status.HTTP_200_OK,
    summary="Permanently delete a product",
    description="Permanently delete a product (hard delete - use with caution)"
)
async def hard_delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Permanently delete a product (cannot be restored).
    
    - **product_id**: Product ID (path parameter, required)
    
    Returns:
        - **200**: Product permanently deleted
        - **404**: Product not found
        - **500**: Internal server error
    """
    try:
        deleted = ProductService.hard_delete_product(db, product_id)

        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Sản phẩm với ID {product_id} không tồn tại"
            )

        return DataResponse.custom_response(
            data=None,
            code="200",
            message="Sản phẩm đã được xóa vĩnh viễn"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )
