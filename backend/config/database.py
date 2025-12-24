from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config.config import settings

# Database URL
DATABASE_URL = settings.DATABASE_URL

# Tạo engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    echo=False
)

# SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class với SQLAlchemy 2.x style (DeclarativeBase)
Base = declarative_base()


# Dependency để lấy database session
def get_db():
    """
    Dependency function để lấy database session.
    Sử dụng với FastAPI: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
