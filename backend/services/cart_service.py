from sqlalchemy.orm import Session
from models.cart import Cart
from models.cart_item import CartItem
from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import Optional


class CartService:
    
    @staticmethod
    def get_or_create_cart(db: Session, user_id: int):
        """Get existing cart or create new one"""
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
        
        if not cart:
            cart = Cart(user_id=user_id)
            db.add(cart)
            db.commit()
            db.refresh(cart)
        
        return jsonable_encoder(cart)
    
    @staticmethod
    def add_to_cart(db: Session, user_id: int, product_id: int, quantity: int, price: Optional[float] = None):
        """Add item to cart"""
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
        
        if not cart:
            cart = Cart(user_id=user_id)
            db.add(cart)
            db.commit()
            db.refresh(cart)
        
        # Check if item already in cart
        cart_item = db.query(CartItem).filter(
            CartItem.cart_id == cart.id,
            CartItem.product_id == product_id
        ).first()
        
        if cart_item:
            # Update quantity if item exists
            cart_item.quantity += quantity
        else:
            # Create new cart item
            cart_item = CartItem(
                cart_id=cart.id,
                product_id=product_id,
                quantity=quantity,
                price=price
            )
            db.add(cart_item)
        
        db.commit()
        db.refresh(cart)
        
        return jsonable_encoder(cart)
    
    @staticmethod
    def update_cart_item(db: Session, user_id: int, item_id: int, quantity: int):
        """Update cart item quantity"""
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
        
        if not cart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart not found"
            )
        
        cart_item = db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id
        ).first()
        
        if not cart_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart item not found"
            )
        
        if quantity <= 0:
            db.delete(cart_item)
        else:
            cart_item.quantity = quantity
        
        db.commit()
        db.refresh(cart)
        
        return jsonable_encoder(cart)
    
    @staticmethod
    def remove_from_cart(db: Session, user_id: int, item_id: int):
        """Remove item from cart"""
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
        
        if not cart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart not found"
            )
        
        cart_item = db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id
        ).first()
        
        if not cart_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart item not found"
            )
        
        db.delete(cart_item)
        db.commit()
        db.refresh(cart)
        
        return jsonable_encoder(cart)
    
    @staticmethod
    def clear_cart(db: Session, user_id: int):
        """Clear all items from cart"""
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
        
        if not cart:
            return
        
        db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
        db.commit()
