from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from fastapi import UploadFile


class ProductSpecBase(BaseModel):
    """Base schema for Product Specification"""
    ram: Optional[str] = Field(None, max_length=20)
    chip: Optional[str] = Field(None, max_length=100)
    screen: Optional[str] = Field(None, max_length=100)
    battery: Optional[str] = Field(None, max_length=50)
    camera: Optional[str] = Field(None, max_length=150)
    quantity_in_stock: int = Field(default=0, ge=0)
    images: Optional[List[str]] = None


class ProductSpecCreate(ProductSpecBase):
    """Schema for creating Product Specification"""
    pass


class ProductSpecResponse(ProductSpecBase):
    """Schema for Product Specification response"""
    id: int
    product_id: Optional[int] = None

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    """Base schema for Product"""
    name: str = Field(..., min_length=1, max_length=150)
    brand_id: Optional[int] = None
    price: float = Field(..., gt=0)
    description: Optional[str] = None


class ProductCreate(ProductBase):
    """Schema for creating Product with Specification"""
    spec: Optional[ProductSpecCreate] = None


class ProductCreateWithFiles(ProductBase):
    """Schema for creating Product with file uploads via form-data"""
    # Note: Files are not included in Pydantic schema, they are handled separately in the endpoint
    # This schema is used for the form-data fields (not files)
class ProductResponse(ProductBase):
    """Schema for Product response"""
    id: int
    created_at: datetime
    spec: Optional[ProductSpecResponse] = None

    class Config:
        from_attributes = True


class ProductDetailResponse(ProductResponse):
    """Detailed product response with all relationships"""
    pass
