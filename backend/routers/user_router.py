from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from config.context import current_user, get_current_user

user_router = APIRouter(
    prefix="/test",
)

@user_router.post(
    "/current-user",
    tags=["user"])
async def register(
    db: Session = Depends(get_db),
    curent_user_data: dict = Depends(get_current_user)
):
    print(curent_user_data)