from fastapi import APIRouter
from fastapi import Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from config.database import get_db
from services.user_service import UserService
from math import ceil

user_router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@user_router.get("/")
async def get_all_users(page: Optional[int] = Query(None, ge=1) , limit : Optional[int] = Query(None, ge=1), search: Optional[str] = Query(None),db: Session = Depends(get_db)):
    users, total = UserService.get_all_users(page,limit,search,db)
    
    if limit:
        total_pages = ceil(total / limit)
    else:
        total_pages = 1
        
    return {
        "data": users,
        "code": "200",
        "message": "get users success",
        "pagination": {
            "page": page,
            "pagesize": limit,
            "total": total,
            "total_pages": total_pages
        }
    }
    
@user_router.put("/lock/{id}")
async def lock_user(id: int, db: Session = Depends(get_db)):
    locked_user = UserService.lock_user(id, db)
    
    return {
        "data": locked_user,
        "code": "200",
        "message": "lock user success"
    }
    
    
@user_router.put("/unlock/{id}")
async def unlock_user(id: int, db: Session = Depends(get_db)):
    unlocked_user = UserService.unlock_user(id, db)
    
    return {
        "data": unlocked_user,
        "code": "200",
        "message": "unlock user success"
    }