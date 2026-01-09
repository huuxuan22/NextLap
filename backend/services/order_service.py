"""Order Service - Business logic for order operations"""
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.order import Order
from models.order_item import OrderItem
from models.product import Product
from models.product_spec import ProductSpec
from fastapi.encoders import jsonable_encoder
from utils.logger import logger
from typing import Optional


class OrderService:
    
    # Valid order status values
    VALID_STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED']
    
    # Status transition rules
    STATUS_TRANSITIONS = {
        'PENDING': ['CONFIRMED', 'CANCELLED'],
        'CONFIRMED': ['PREPARING', 'CANCELLED'],
        'PREPARING': ['SHIPPING', 'CANCELLED'],
        'SHIPPING': ['DELIVERED', 'CANCELLED'],
        'DELIVERED': [],  # Final state
        'CANCELLED': []   # Final state
    }
    
    @staticmethod
    def _serialize_order_with_items(order: Order) -> dict:
        """Serialize order with items including product details, user information, and payment"""
        order_data = jsonable_encoder(order)
        
        # Add user information
        if order.user:
            user = order.user
            order_data["user"] = {
                "id": user.id,
                "fullname": user.full_name,
                "email": user.email,
                "phone": user.phone,
                "address": user.address,
                "avatar": user.avatar
            }
        
        # Add payment information
        if order.payment:
            payment = order.payment
            order_data["payment"] = {
                "id": payment.id,
                "method": payment.method,
                "amount": float(payment.amount) if payment.amount else None,
                "status": payment.status,
                "paid_at": payment.paid_at.isoformat() if payment.paid_at else None
            }
        else:
            order_data["payment"] = None
        
        # Add product details to each order item
        if order.order_items:
            items_with_product = []
            for item in order.order_items:
                item_data = jsonable_encoder(item)
                if item.product:
                    product = item.product
                    images = None
                    if product.spec and product.spec.images:
                        images = product.spec.images
                    
                    item_data["product"] = {
                        "id": product.id,
                        "name": product.name,
                        "price": float(product.price),
                        "images": images
                    }
                items_with_product.append(item_data)
            order_data["order_items"] = items_with_product
        
        return order_data
    
    @staticmethod
    def get_user_orders(
        db: Session, 
        user_id: int, 
        skip: int = 0, 
        limit: int = 10,
        status_filter: Optional[str] = None
    ):
        """Get user orders with pagination and optional status filter"""
        query = db.query(Order).filter(Order.user_id == user_id)
        
        if status_filter:
            query = query.filter(Order.status == status_filter.upper())
        
        query = query.order_by(Order.created_at.desc())
        
        logger.info(f"Fetching orders for user_id={user_id}, skip={skip}, limit={limit}, status={status_filter}")
        
        orders = query.offset(skip).limit(limit).all()
        
        logger.info(f"Retrieved {len(orders)} orders")
        
        return [OrderService._serialize_order_with_items(order) for order in orders]
    
    @staticmethod
    def get_user_orders_count(
        db: Session, 
        user_id: int,
        status_filter: Optional[str] = None
    ) -> int:
        """Get total count of user orders"""
        query = db.query(Order).filter(Order.user_id == user_id)
        
        if status_filter:
            query = query.filter(Order.status == status_filter.upper())
        
        return query.count()
    
    @staticmethod
    def get_order_detail(db: Session, order_id: int, user_id: int):
        """Get order detail for specific user"""
        order = db.query(Order).filter(
            Order.id == order_id,
            Order.user_id == user_id
        ).first()
        
        if not order:
            return None
        
        return OrderService._serialize_order_with_items(order)
    
    @staticmethod
    def get_all_orders(
        db: Session, 
        skip: int = 0, 
        limit: int = 10,
        status_filter: Optional[str] = None
    ):
        """Get all orders (admin only) with pagination and optional status filter"""
        query = db.query(Order)
        
        if status_filter:
            query = query.filter(Order.status == status_filter.upper())
        
        query = query.order_by(Order.created_at.desc())
        
        orders = query.offset(skip).limit(limit).all()
        
        return [OrderService._serialize_order_with_items(order) for order in orders]
    
    @staticmethod
    def get_all_orders_count(
        db: Session,
        status_filter: Optional[str] = None
    ) -> int:
        """Get total count of all orders"""
        query = db.query(Order)
        
        if status_filter:
            query = query.filter(Order.status == status_filter.upper())
        
        return query.count()
    
    @staticmethod
    def get_order_detail_admin(db: Session, order_id: int):
        """Get order detail (admin only) - no user_id restriction"""
        order = db.query(Order).filter(Order.id == order_id).first()
        
        if not order:
            return None
        
        return OrderService._serialize_order_with_items(order)
    
    @staticmethod
    def update_order_status(db: Session, order_id: int, new_status: str):
        """Update order status with validation and transition rules"""
        # Validate status
        new_status = new_status.upper()
        if new_status not in OrderService.VALID_STATUSES:
            raise ValueError(
                f"Trạng thái không hợp lệ. Các trạng thái hợp lệ: {', '.join(OrderService.VALID_STATUSES)}"
            )
        
        order = db.query(Order).filter(Order.id == order_id).first()
        
        if not order:
            return None
        
        old_status = order.status
        
        # Check if status transition is allowed
        if old_status in OrderService.STATUS_TRANSITIONS:
            allowed_transitions = OrderService.STATUS_TRANSITIONS[old_status]
            if new_status not in allowed_transitions and old_status != new_status:
                status_names = {
                    'PENDING': 'Chờ xác nhận',
                    'CONFIRMED': 'Đã xác nhận',
                    'PREPARING': 'Đang chuẩn bị hàng',
                    'SHIPPING': 'Đang giao hàng',
                    'DELIVERED': 'Hoàn thành',
                    'CANCELLED': 'Đã hủy'
                }
                
                if not allowed_transitions:
                    raise ValueError(
                        f"Không thể thay đổi trạng thái từ '{status_names.get(old_status, old_status)}'. "
                        f"Đây là trạng thái cuối cùng."
                    )
                
                allowed_names = [status_names.get(s, s) for s in allowed_transitions]
                raise ValueError(
                    f"Không thể chuyển từ trạng thái '{status_names.get(old_status, old_status)}' "
                    f"sang '{status_names.get(new_status, new_status)}'. "
                    f"Các trạng thái được phép: {', '.join(allowed_names)}"
                )
        
        # If same status, no change needed
        if old_status == new_status:
            logger.info(f"Order {order_id} already has status {new_status}, no update needed")
            return OrderService._serialize_order_with_items(order)
        
        order.status = new_status
        
        try:
            db.commit()
            db.refresh(order)
            
            logger.info(f"Order {order_id} status updated from {old_status} to {new_status}")
            
            return OrderService._serialize_order_with_items(order)
        except Exception as e:
            db.rollback()
            logger.error(f"Error updating order status: {str(e)}")
            raise

        """Get order statistics for admin dashboard"""
        # Total orders
        total_orders = db.query(Order).count()
        
        # Orders by status
        status_counts = db.query(
            Order.status,
            func.count(Order.id).label('count')
        ).group_by(Order.status).all()
        
        orders_by_status = {status: count for status, count in status_counts}
        
        # Total revenue (only for delivered orders)
        total_revenue = db.query(func.sum(Order.total)).filter(
            Order.status == 'DELIVERED'
        ).scalar() or 0
        
        # Average order value
        avg_order_value = db.query(func.avg(Order.total)).scalar() or 0
        
        statistics = {
            "total_orders": total_orders,
            "orders_by_status": orders_by_status,
            "total_revenue": float(total_revenue),
            "average_order_value": float(avg_order_value),
            "delivered_orders": orders_by_status.get('DELIVERED', 0),
            "pending_orders": orders_by_status.get('PENDING', 0),
            "confirmed_orders": orders_by_status.get('CONFIRMED', 0),
            "preparing_orders": orders_by_status.get('PREPARING', 0),
            "shipping_orders": orders_by_status.get('SHIPPING', 0),
            "cancelled_orders": orders_by_status.get('CANCELLED', 0)
        }
        
        logger.info(f"Order statistics generated: {statistics}")
        
        return statistics