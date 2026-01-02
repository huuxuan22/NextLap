"""Auth Router - RESTful endpoints for authentication"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from config.database import get_db
from schemas.user_schemas import RegisterSchema, LoginSchemas, LoginResponseSchema, UserSchema
from schemas.base_schema import DataResponse
from services.auth_service import AuthService

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
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
        # Call service to register user
        new_user = AuthService.register_user(db, data)
        
        # Return success response
        return DataResponse.custom_response(
            data=new_user,
            code="201",
            message="register success"
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except IntegrityError as e:
        # Handle database constraint violations
        db.rollback()
        if "email" in str(e.orig).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email này đã được đăng ký"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Lỗi cơ sở dữ liệu đã xảy ra"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"an error occurred: {str(e)}"
        )


@auth_router.post(
    "/login",
    response_model=DataResponse[LoginResponseSchema],
    status_code=status.HTTP_200_OK,
    tags=["user"]
)
async def login(
    data: LoginSchemas,
    db: Session = Depends(get_db)
):
    try:
        login_response = AuthService.login_user(db, data)
        return DataResponse.custom_response(
            data=login_response,
            code="200",
            message="login success"
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi đã xảy ra: {str(e)}"
        )
