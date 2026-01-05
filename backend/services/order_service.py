from sqlalchemy.orm import Session
from models.order import Order
from models.order_item import OrderItem
from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder


class OrderService:
    
    @staticmethod
    def get_user_orders(db: Session, user_id: int, page: int = 1, limit: int = 10):
        """Get user orders with pagination"""
        query = db.query(Order).filter(Order.user_id == user_id).order_by(Order.created_at.desc())
        
        total = query.count()
        orders = query.offset((page - 1) * limit).limit(limit).all()
        
        return [jsonable_encoder(order) for order in orders], total
    
    @staticmethod
    def get_order_detail(db: Session, order_id: int, user_id: int):
        """Get order detail"""
        order = db.query(Order).filter(
            Order.id == order_id,
            Order.user_id == user_id
        ).first()
        
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )
        
        return jsonable_encoder(order)
