from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from config.database import get_db
from middleware.auth_midleware import authenticate_user, check_admin
from services.order_service import OrderService
from schemas.base_schema import DataResponse
from utils.logger import logger

order_router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)


@order_router.get(
    "",
    response_model=DataResponse[list],
    status_code=status.HTTP_200_OK,
    summary="Get orders",
    description="Retrieve orders - current user's orders or all orders if admin"
)
async def get_orders(
    request: Request,
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(10, ge=1, le=100, description="Maximum items to return"),
    status: str = Query(None, description="Filter by order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)"),
    db: Session = Depends(get_db)
):
    """
    Get orders with pagination and optional status filter.
    
    - Regular users: Get their own orders
    - Admin users: Get all orders from all users
    
    Query parameters:
    - **skip**: Number of orders to skip (default: 0)
    - **limit**: Maximum number of orders to return (default: 10, max: 100)
    - **status**: Filter by order status - PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED (optional)
    
    Returns:
        - **200**: List of orders
        - **401**: Unauthorized
        - **500**: Internal server error
    """
    try:
        await authenticate_user(request)
        user = request.state.user
        is_admin = user.role and (user.role.name == "admin" or user.role.id == 1)
        
        logger.info(f"Getting orders for user: {user.id} (username: {getattr(user, 'username', 'N/A')}, role: {user.role.name if user.role else 'N/A'}, is_admin: {is_admin}, status_filter: {status})")
        
        if is_admin:
            orders = OrderService.get_all_orders(db, skip=skip, limit=limit, status_filter=status)
            total = OrderService.get_all_orders_count(db, status_filter=status)
            logger.info(f"Admin {user.id} getting all orders - Found {total} total orders, returning {len(orders)} orders (status: {status})")
        else:
            orders = OrderService.get_user_orders(
                db,
                user_id=user.id,
                skip=skip,
                limit=limit,
                status_filter=status
            )
            total = OrderService.get_user_orders_count(db, user.id, status_filter=status)
            logger.info(f"User {user.id} getting own orders - Found {total} total orders, returning {len(orders)} orders (status: {status})")
        
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
        
        return DataResponse.custom_response(
            data=orders,
            code="200",
            message=f"Lấy danh sách đơn hàng thành công (tổng: {total})",
            pagination=pagination
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )


@order_router.get(
    "/{order_id}",
    response_model=DataResponse,
    status_code=status.HTTP_200_OK,
    summary="Get order detail",
    description="Retrieve a specific order detail - users can view their own orders, admins can view any order"
)
async def get_order_detail(
    request: Request,
    order_id: int,
    db: Session = Depends(get_db)
):
    """
    Get order details by order ID.
    
    - **order_id**: Order ID (path parameter, required)
    
    Authorization:
    - Regular users: Can only view their own orders
    - Admin users: Can view any order
    
    Returns:
        - **200**: Order found
        - **401**: Unauthorized
        - **403**: Forbidden - trying to access someone else's order
        - **404**: Order not found
        - **500**: Internal server error
    """
    try:
        await authenticate_user(request)
        user = request.state.user
        is_admin = user.role and (user.role.name == "admin" or user.role.id == 1)
        
        if is_admin:
            order = OrderService.get_order_detail_admin(db, order_id)
            logger.info(f"Admin {user.id} getting order detail for order_id={order_id}")
        else:
            order = OrderService.get_order_detail(db, order_id, user.id)
            logger.info(f"User {user.id} getting order detail for order_id={order_id}")
        
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Đơn hàng với ID {order_id} không tồn tại"
            )
        
        # Check if non-admin user is trying to access someone else's order
        if not is_admin and order.user_id != user.id:
            logger.warning(f"User {user.id} attempted to access order {order_id} of user {order.user_id}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bạn không có quyền xem đơn hàng này"
            )
        
        return DataResponse.custom_response(
            data=order,
            code="200",
            message="Lấy chi tiết đơn hàng thành công"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )

