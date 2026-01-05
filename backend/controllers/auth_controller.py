from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from config.config import settings
from schemas.user_schemas import RegisterSchema, LoginSchemas, LoginResponseSchema, UserSchema
from schemas.base_schema import DataResponse
from services.auth_service import AuthService
from config.database import get_db
import urllib.parse

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
                detail="Email này đã tồn tại"
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

@auth_router.get("/google/login")
async def login_google(request: Request):
    return await AuthService.get_google_redirect_uri(request)

@auth_router.get("/google/callback")
async def google_callback(
    request: Request,
    db: Session = Depends(get_db),
):
    result: LoginResponseSchema = await AuthService.handle_google_callback(request, db=db)

    # Encode user data
    import urllib.parse
    user_data_json = result.user_principal.model_dump_json()
    user_data_encoded = urllib.parse.quote(user_data_json)
    
    redirect_url = (
        f"{settings.FRONTEND_URL}/auth/callback?"
        f"oauth=google&status=success"
        f"&access_token={result.access_token}"
        f"&user_data={user_data_encoded}"
)
    
    redirect_response = RedirectResponse(url=redirect_url)
    
    redirect_response.set_cookie(
        key="token_access", 
        value=result.access_token, 
        httponly=True, 
        secure=True, 
        samesite="none",
        domain="localhost",
        path="/"
    )
    
    redirect_response.set_cookie(
        key="current_user", 
        value=result.user_principal.email, 
        httponly=False, 
        secure=True, 
        samesite="none",
        domain="localhost",
        path="/"
    )
    
    return redirect_response

@auth_router.get("/facebook/login")
async def login_facebook(request: Request):
    return await AuthService.get_facebook_redirect_uri(request)

@auth_router.get("/facebook/callback")
async def facebook_callback(
    request: Request,
    db: Session = Depends(get_db),
):
    result: LoginResponseSchema = await AuthService.handle_facebook_callback(request, db=db)

    # Encode user data
    user_data_json = result.user_principal.model_dump_json()
    user_data_encoded = urllib.parse.quote(user_data_json)
    
    redirect_url = (
        f"{settings.FRONTEND_URL}/auth/callback?"
        f"oauth=facebook&status=success"
        f"&access_token={result.access_token}"
        f"&user_data={user_data_encoded}"
)
    
    redirect_response = RedirectResponse(url=redirect_url)
    
    redirect_response.set_cookie(
        key="token_access", 
        value=result.access_token, 
        httponly=True, 
        secure=True, 
        samesite="none",
        domain="localhost",
        path="/"
    )
    
    redirect_response.set_cookie(
        key="current_user", 
        value=result.user_principal.email, 
        httponly=False, 
        secure=True, 
        samesite="none",
        domain="localhost",
        path="/"
    )
    
    return redirect_response