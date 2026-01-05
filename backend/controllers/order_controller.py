from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from config.database import get_db
from middleware.auth_midleware import authenticate_user
from services.order_service import OrderService
from schemas.base_schema import DataResponse

order_router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)


@order_router.get("")
async def get_user_orders(
    request: Request,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get current user's orders"""
    await authenticate_user(request)
    user = request.state.user
    
    orders, total = OrderService.get_user_orders(db, user.id, page, limit)
    
    total_pages = (total + limit - 1) // limit
    
    return DataResponse.custom_response(
        data=orders,
        code="200",
        message="Get orders successfully",
        pagination={
            "page": page,
            "pagesize": limit,
            "total": total,
            "total_pages": total_pages
        }
    )


@order_router.get("/{order_id}")
async def get_order_detail(
    request: Request,
    order_id: int,
    db: Session = Depends(get_db)
):
    """Get order detail"""
    await authenticate_user(request)
    user = request.state.user
    
    order = OrderService.get_order_detail(db, order_id, user.id)
    
    return DataResponse.custom_response(
        data=order,
        code="200",
        message="Get order detail successfully"
    )
