from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from config.database import get_db
from middleware.auth_midleware import authenticate_user
from services.cart_service import CartService
from schemas.base_schema import DataResponse
from pydantic import BaseModel
from typing import Optional

cart_router = APIRouter(
    prefix="/carts",
    tags=["carts"]
)


class CartItemRequest(BaseModel):
    product_id: int
    quantity: int = 1
    price: Optional[float] = None


@cart_router.get("")
async def get_cart(
    request: Request,
    db: Session = Depends(get_db)
):
    """Get current user's cart"""
    await authenticate_user(request)
    user = request.state.user
    
    cart = CartService.get_or_create_cart(db, user.id)
    
    return DataResponse.custom_response(
        data=cart,
        code="200",
        message="Get cart successfully"
    )


@cart_router.post("/items")
async def add_to_cart(
    request: Request,
    data: CartItemRequest,
    db: Session = Depends(get_db)
):
    """Add item to cart"""
    await authenticate_user(request)
    user = request.state.user
    
    cart = CartService.add_to_cart(
        db, user.id, data.product_id, data.quantity, data.price
    )
    
    return DataResponse.custom_response(
        data=cart,
        code="201",
        message="Item added to cart successfully"
    )


@cart_router.put("/items/{item_id}")
async def update_cart_item(
    request: Request,
    item_id: int,
    data: CartItemRequest,
    db: Session = Depends(get_db)
):
    """Update cart item quantity"""
    await authenticate_user(request)
    user = request.state.user
    
    cart = CartService.update_cart_item(
        db, user.id, item_id, data.quantity
    )
    
    return DataResponse.custom_response(
        data=cart,
        code="200",
        message="Cart item updated successfully"
    )


@cart_router.delete("/items/{item_id}")
async def remove_from_cart(
    request: Request,
    item_id: int,
    db: Session = Depends(get_db)
):
    """Remove item from cart"""
    await authenticate_user(request)
    user = request.state.user
    
    cart = CartService.remove_from_cart(db, user.id, item_id)
    
    return DataResponse.custom_response(
        data=cart,
        code="200",
        message="Item removed from cart successfully"
    )


@cart_router.delete("")
async def clear_cart(
    request: Request,
    db: Session = Depends(get_db)
):
    """Clear entire cart"""
    await authenticate_user(request)
    user = request.state.user
    
    CartService.clear_cart(db, user.id)
    
    return DataResponse.custom_response(
        data=None,
        code="200",
        message="Cart cleared successfully"
    )
