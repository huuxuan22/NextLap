"""Order schemas - Pydantic models for order operations"""
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import datetime
from enum import Enum


class OrderStatus(str, Enum):
    """Valid order status values"""
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    PREPARING = "PREPARING"
    SHIPPING = "SHIPPING"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"


class ProductInfoInOrder(BaseModel):
    """Schema for product info in order item"""
    id: int
    name: str
    price: float
    images: Optional[List[str]] = None

    class Config:
        from_attributes = True


class OrderItemBase(BaseModel):
    """Base schema for Order Item"""
    product_id: int
    quantity: int = Field(..., gt=0)
    price: float = Field(..., gt=0)


class OrderItemCreate(OrderItemBase):
    """Schema for creating Order Item"""
    pass


class OrderItemResponse(OrderItemBase):
    """Schema for Order Item response with product details"""
    id: int
    order_id: Optional[int] = None
    product: Optional[ProductInfoInOrder] = None

    class Config:
        from_attributes = True


class PaymentResponse(BaseModel):
    """Schema for Payment information in order"""
    id: int
    method: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    paid_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserInfoInOrder(BaseModel):
    """Schema for user info in order"""
    id: int
    fullname: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    avatar: Optional[str] = None

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    """Base schema for Order"""
    status: str = Field(default="PENDING", max_length=30)
    total: Optional[float] = Field(None, gt=0)


class OrderCreate(OrderBase):
    """Schema for creating Order with items"""
    order_items: List[OrderItemCreate] = Field(..., min_length=1)
    
    @field_validator('status')
    @classmethod
    def validate_status(cls, v):
        """Validate status is one of the allowed values"""
        valid_statuses = [status.value for status in OrderStatus]
        if v.upper() not in valid_statuses:
            raise ValueError(f'Status must be one of: {", ".join(valid_statuses)}')
        return v.upper()


class OrderStatusUpdate(BaseModel):
    """Schema for updating order status"""
    status: OrderStatus
    
    class Config:
        use_enum_values = True


class OrderResponse(OrderBase):
    """Schema for Order response"""
    id: int
    user_id: Optional[int] = None
    created_at: datetime
    order_items: Optional[List[OrderItemResponse]] = None
    payment: Optional[PaymentResponse] = None
    user: Optional[UserInfoInOrder] = None

    class Config:
        from_attributes = True


class OrderDetailResponse(OrderResponse):
    """Detailed order response with all items and relationships"""
    pass


class OrderStatisticsResponse(BaseModel):
    """Schema for order statistics"""
    total_orders: int
    orders_by_status: dict
    total_revenue: float
    average_order_value: float
    delivered_orders: int
    pending_orders: int
    processing_orders: int
    cancelled_orders: int