from sqlalchemy.orm import Session
from models.user import User
from typing import List, Optional
from fastapi import HTTPException, status

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