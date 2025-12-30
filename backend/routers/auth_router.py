from enum import verify
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from utils.auth import generate_token
from config.database import get_db
from models.user import User
from models.role import Roles
from schemas.user_schemas import LoginResponseSchema, LoginSchemas, RegisterSchema, UserSchema
from schemas.base_schema import DataResponse
from constants.role import ROLE_REGISTER_DEFAULT
from utils.password import hash_password, verify_password
from fastapi.encoders import jsonable_encoder
auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@auth_router.post(
    "/register",
    response_model=DataResponse[UserSchema],
    status_code=status.HTTP_201_CREATED,
    tags=["user"])
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

@auth_router.post(
    "/login",
    response_model=DataResponse[LoginResponseSchema],
    status_code=status.HTTP_200_OK,
    tags=["user"])
async def login(
    data: LoginSchemas,
    db: Session = Depends(get_db)
):
    try:
        existing_user = db.query(User).filter(User.email == data.email).first()
        role = jsonable_encoder(existing_user.role)
        if not existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Không tìm thấy người dùng hoặc sai mật khẩu")
        
        if not verify_password(data.password,existing_user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Không tìm thấy người dùng hoặc sai mật khẩu"
            )

        access_token = generate_token(
                data={
                    "sub": str(existing_user.id),
                    "email": existing_user.email,
                    "role": role['name'],
                }
            )

        return DataResponse.custom_response(
            data=LoginResponseSchema(
                access_token=access_token,
                user_principal=UserSchema.model_validate(existing_user)
            ),
            code="200",
            message="login success"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"an error occurred: {str(e)}"
        )  

