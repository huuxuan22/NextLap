from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime
from config.database import Base


class Brand(Base):
    __tablename__ = "brands"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    country: Mapped[str | None] = mapped_column(String(50), nullable=True)
    deleted_at: Mapped[str | None] = mapped_column(DateTime, nullable=True)

    # Relationships
    products: Mapped[list["Product"]] = relationship(
        "Product", back_populates="brand", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Brand(id={self.id}, name={self.name})>"

