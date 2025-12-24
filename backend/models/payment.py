from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Numeric, ForeignKey, TIMESTAMP
from config.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    order_id: Mapped[int | None] = mapped_column(
        ForeignKey("orders.id"), nullable=True
    )
    method: Mapped[str | None] = mapped_column(String(50), nullable=True)
    amount: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    status: Mapped[str | None] = mapped_column(String(30), nullable=True)
    paid_at: Mapped[None] = mapped_column(TIMESTAMP, nullable=True)

    # Relationships
    order: Mapped["Order | None"] = relationship("Order", back_populates="payment")

    def __repr__(self):
        return f"<Payment(id={self.id}, order_id={self.order_id}, status={self.status})>"

