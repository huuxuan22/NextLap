from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from config.database import Base


class Cart(Base):
    __tablename__ = "carts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"), nullable=True
    )
    created_at: Mapped[None] = mapped_column(
        TIMESTAMP, server_default=func.current_timestamp(), nullable=False
    )

    # Relationships
    user: Mapped["User | None"] = relationship("User", back_populates="cart")
    cart_items: Mapped[list["CartItem"]] = relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Cart(id={self.id}, user_id={self.user_id})>"

