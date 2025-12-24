from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from config.database import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    # Relationships
    products: Mapped[list["Product"]] = relationship(
        "Product", back_populates="category", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Category(id={self.id}, name={self.name})>"

