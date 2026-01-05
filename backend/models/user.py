from typing import Optional, TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Boolean, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from config.database import Base

if TYPE_CHECKING:
    from models.role import Roles
    from models.order import Order
    from models.cart import Cart


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    full_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    email: Mapped[str | None] = mapped_column(String(120), unique=True, nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    avatar: Mapped[str | None] = mapped_column(String(255), nullable=True)
    password: Mapped[str | None] = mapped_column(String(255), nullable=True)  
    role_id: Mapped[int | None] = mapped_column(
        ForeignKey("roles.id"), nullable=True
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_login: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    created_at: Mapped[None] = mapped_column(
        TIMESTAMP, server_default=func.current_timestamp(), nullable=False
    )

    role: Mapped[Optional["Roles"]] = relationship("Roles", back_populates="users")
    orders: Mapped[list["Order"]] = relationship(
        "Order", back_populates="user", cascade="all, delete-orphan"
    )
    cart: Mapped[Optional["Cart"]] = relationship(
        "Cart", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email})>"

