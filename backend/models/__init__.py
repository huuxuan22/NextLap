# Import tất cả models để Alembic có thể auto-detect
from models.brand import Brand
from models.product import Product
from models.product_spec import ProductSpec
from models.user import User
from models.order import Order
from models.order_item import OrderItem
from models.payment import Payment
from models.cart import Cart
from models.cart_item import CartItem
from models.role import Roles

__all__ = [
    "Brand",
    "Product",
    "ProductSpec",
    "User",
    "Order",
    "OrderItem",
    "Payment",
    "Cart",
    "CartItem",
    "Roles"
]





