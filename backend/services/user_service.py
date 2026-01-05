from sqlalchemy.orm import Session
from models.user import User
from typing import List, Optional
from fastapi import HTTPException, status
from utils.password import hash_password, verify_password
from fastapi.encoders import jsonable_encoder

class UserService:
    
    @staticmethod
    def get_all_users(page: Optional[int], limit: Optional[int],search: Optional[str],  db: Session) -> List[User]:
        query = db.query(User).filter(User.role_id==2)
        
        if search:
            query = query.filter(User.full_name.like(f"%{search}%"))
            
        total = query.count()
        
        if page is None or limit is None:
            users = query.all()
            return users, total
    
        users=(query.offset((page-1)*limit)
            .limit(limit)
            .all())
        
        return users, total
    
    @staticmethod
    def lock_user(user_id: int, db: Session) -> Optional[User]:
        user = db.query(User).filter((User.id == user_id) & (User.is_active == True)).first()
        if not user:
           raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or already locked")
        
        user.is_active = False
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def unlock_user(user_id: int, db: Session) -> Optional[User]:
        user = db.query(User).filter((User.id == user_id) & (User.is_active == False)).first()
        if not user:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or already unlocked")
        
        user.is_active = True
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def update_user_profile(db: Session, user_id: int, update_data: dict):
        """Update user profile information"""
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Update allowed fields
        allowed_fields = ['full_name', 'phone', 'address', 'avatar']
        for field, value in update_data.items():
            if field in allowed_fields and value is not None:
                setattr(user, field, value)
        
        db.commit()
        db.refresh(user)
        
        return jsonable_encoder(user)
    
    @staticmethod
    def change_password(db: Session, user_id: int, current_password: str, new_password: str):
        """Change user password"""
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Verify current password
        if not verify_password(current_password, user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Mật khẩu hiện tại không đúng"
            )
        
        # Hash and update new password
        user.password = hash_password(new_password)
        db.commit()
        
        return True