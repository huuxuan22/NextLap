from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from config.database import get_db
from models.user import User
from schemas.user_schemas import RegisterSchema, UserSchema
from schemas.base_schema import DataResponse
from constants.role import ROLE_REGISTER_DEFAULT
from utils.password import hash_password

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@auth_router.post(
    "/register",
    response_model=DataResponse[UserSchema],
    status_code=status.HTTP_201_CREATED,
    tags=["user"]
)
async def register(
    data: RegisterSchema,
    db: Session = Depends(get_db)
):
    try:
        # Check if email already exists
        existing_user = db.query(User).filter(User.email == data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="email already registered"
                )
        
        hashed_password = hash_password(data.password)
        
        new_user = User(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone,
            address=data.address,
            password=hashed_password,  
            role_id=ROLE_REGISTER_DEFAULT  
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return DataResponse.custom_response(
            data=new_user,
            code="201",
            message="register success"
        )
        
    except HTTPException:
        raise
    except IntegrityError as e:
        db.rollback()
        if "email" in str(e.orig).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="email already registered"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="database error occurred"
        )
    except Exception as e:
        # Handle any other unexpected errors
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"an error occurred: {str(e)}"
        )

