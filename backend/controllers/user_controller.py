from fastapi import APIRouter, HTTPException, Request, status
from fastapi import Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from config.database import get_db
from services.user_service import UserService
from middleware.auth_midleware import authenticate_user
from schemas.base_schema import DataResponse
from schemas.user_schemas import UserSchema
from pydantic import BaseModel
from math import ceil

user_router = APIRouter(
    prefix="/users",
    tags=["users"]
)


class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    avatar: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


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


@user_router.put("/profile", response_model=DataResponse[UserSchema])
async def update_profile(
    request: Request,
    data: UpdateProfileRequest,
    db: Session = Depends(get_db)
):
    """Update current user profile"""
    await authenticate_user(request)
    user = request.state.user
    
    updated_user = UserService.update_user_profile(
        db, user.id, data.dict(exclude_unset=True)
    )
    
    return DataResponse.custom_response(
        data=updated_user,
        code="200",
        message="Profile updated successfully"
    )


@user_router.post("/change-password")
async def change_password(
    request: Request,
    data: ChangePasswordRequest,
    db: Session = Depends(get_db)
):
    """Change user password"""
    await authenticate_user(request)
    user = request.state.user
    
    UserService.change_password(
        db, user.id, data.current_password, data.new_password
    )
    
    return DataResponse.custom_response(
        data=None,
        code="200",
        message="Password changed successfully"
    )