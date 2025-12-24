from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from config.database import Base


class Roles(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # Relationships - một role có nhiều users
    users: Mapped[list["User"]] = relationship(
        "User", back_populates="role"
    )

    def __repr__(self):
        return f"<Roles(id={self.id}, name={self.name})>"