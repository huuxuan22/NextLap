from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.dialects.mysql import JSON
from config.database import Base


class ProductSpec(Base):
    __tablename__ = "product_specs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int | None] = mapped_column(
        ForeignKey("products.id"), nullable=True
    )
    ram: Mapped[str | None] = mapped_column(String(20), nullable=True)
    chip: Mapped[str | None] = mapped_column(String(100), nullable=True)
    screen: Mapped[str | None] = mapped_column(String(100), nullable=True)
    battery: Mapped[str | None] = mapped_column(String(50), nullable=True)
    camera: Mapped[str | None] = mapped_column(String(150), nullable=True)
    quantity_in_stock: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    images: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    # Relationships
    product: Mapped["Product | None"] = relationship(
        "Product", back_populates="spec"
    )

    def __repr__(self):
        return f"<ProductSpec(id={self.id}, product_id={self.product_id})>"

