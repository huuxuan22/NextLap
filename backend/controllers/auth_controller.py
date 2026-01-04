from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from schemas.user_schemas import RegisterSchema, LoginSchemas, LoginResponseSchema, UserSchema
from schemas.base_schema import DataResponse
from services.auth_service import AuthService
from config.database import get_db

auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post(
    "/register",
    response_model=DataResponse[UserSchema],
    status_code=status.HTTP_201_CREATED,
)
async def register(
    data: RegisterSchema,
    db: Session = Depends(get_db)
):
    try:
        user = AuthService.register_user(db, data)

        return DataResponse.custom_response(
            data=user,
            code="201",
            message="Register successfully"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

    except IntegrityError as e:
        db.rollback()
        if "email" in str(e.orig).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error occurred"
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )


@auth_router.post(
    "/login",
    response_model=DataResponse[LoginResponseSchema],
    status_code=status.HTTP_200_OK,
)
async def login(
    data: LoginSchemas,
    db: Session = Depends(get_db)
):
    try:
        result = AuthService.login_user(db, data)

        return DataResponse.custom_response(
            data=result,
            code="200",
            message="Login successfully"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )
