"""Auth Service - Business logic layer for authentication"""
from errno import errorcode
from fastapi.responses import RedirectResponse
import httpx
from sqlalchemy import update
from sqlalchemy.orm import Session
from config.config import settings
from models.user import User
from schemas.user_schemas import RegisterSchema, LoginSchemas, LoginResponseSchema, UserSchema
from constants.role import ROLE_REGISTER_DEFAULT
from utils.password import hash_password, verify_password
from utils.auth import generate_token
from fastapi.encoders import jsonable_encoder
from authlib.integrations.starlette_client import OAuth
from fastapi import HTTPException, status

oauth = OAuth()
oauth.register(
    name="google",
    server_metadata_url=settings.GOOGLE_SERVER_METADATA_URL,
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    client_kwargs=settings.GOOGLE_CLIENT_KWARGS,
)

class AuthService:
    """Service class for authentication business logic"""
    
    @staticmethod
    def register_user(db: Session, data: RegisterSchema) -> User:
       
        # Check if email already exists
        existing_user = db.query(User).filter(User.email == data.email).first()
        if existing_user:
            raise ValueError("email already registered")
        
        # Hash password
        hashed_password = hash_password(data.password)
        
        # Create new user
        new_user = User(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone,
            is_login="NOMAL",
            address=data.address,
            password=hashed_password,
            role_id=ROLE_REGISTER_DEFAULT
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return new_user
    
    @staticmethod
    def login_user(db: Session, data: LoginSchemas) -> LoginResponseSchema:
        # Find user by email
        existing_user = db.query(User).filter(User.email == data.email).first()
        
        if not existing_user:
            raise ValueError("Không tìm thấy người dùng hoặc sai mật khẩu")
        
        # Verify password
        if not verify_password(data.password, existing_user.password):
            raise ValueError("Không tìm thấy người dùng hoặc sai mật khẩu")
        
        # Get role information
        role = jsonable_encoder(existing_user.role)
        
        # Generate access token
        access_token = generate_token(
            data={
                "sub": str(existing_user.id),
                "email": existing_user.email,
                "role": role['name'],
            }
        )
        
        # Create login response
        login_response = LoginResponseSchema(
            access_token=access_token,
            user_principal=UserSchema.model_validate(existing_user)
        )
        
        return login_response

    @staticmethod
    async def get_google_redirect_uri(request):
        redirect_uri = f"{settings.BACKEND_URL}/auth/google/callback"
        return await oauth.google.authorize_redirect(request, redirect_uri)

    @staticmethod
    async def handle_google_callback(request, db: Session) -> LoginResponseSchema:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get("userinfo") or {}

        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")

        if not email:
            raise ValueError("Không lấy được email từ Google")

        existing_user = db.query(User).filter(User.email == email).first()
        
        if existing_user:
            if not existing_user.is_active:
                raise ValueError("Tài khoản đã bị khoá")
            db_user = existing_user
        else:
            new_user = User(    
                email=email,
                full_name=name,
                avatar=picture,
                is_active=True,
                role_id=ROLE_REGISTER_DEFAULT,
                is_login="GOOGLE",
                password=None  
            )
            
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            db_user = new_user

        role = jsonable_encoder(db_user.role)
        
        access_token = generate_token(
            data={
                "sub": str(db_user.id),
                "email": db_user.email,
                "role": role['name'],
            }
        )
        login_response = LoginResponseSchema(
            access_token=access_token,
            user_principal=UserSchema.model_validate(db_user)
        )

        return login_response

    @staticmethod
    async def get_facebook_redirect_uri(request):
        # Redirect người dùng tới Facebook OAuth
        # Scope cần thiết: public_profile (mặc định) và email (cần permission)
        fb_auth_url = (
            f"https://www.facebook.com/v18.0/dialog/oauth?"
            f"client_id={settings.FACEBOOK_APP_ID}&"
            f"redirect_uri={settings.BACKEND_URL}/auth/facebook/callback&"
            f"response_type=code&"
            f"scope=public_profile,email"  
        )
        return RedirectResponse(fb_auth_url)

    @staticmethod
    async def handle_facebook_callback( request, db: Session) -> LoginResponseSchema:
        code = request.query_params.get("code")
        if not code:
            raise HTTPException(status_code=400, detail="Không có code bảo vệ của facebook")

        token_url = (
            f"https://graph.facebook.com/v16.0/oauth/access_token?"
            f"client_id={settings.FACEBOOK_APP_ID}&"
            f"redirect_uri={settings.BACKEND_URL}/auth/facebook/callback&"
            f"client_secret={settings.FACEBOOK_APP_SECRET}&"
            f"code={code}"
        )

        async with httpx.AsyncClient() as client:
            token_res = await client.get(token_url)
            token_data = token_res.json()
            fb_access_token = token_data.get("access_token")
            if not fb_access_token:
                raise HTTPException(status_code=400, detail="Không thể lấy token từ facebook")

            # 2. Lấy user info từ Facebook (id, name, email)
            profile_url = "https://graph.facebook.com/me"
            params = {"fields": "id,name,email,picture", "access_token": fb_access_token}
            profile_res = await client.get(profile_url, params=params)
            user_info = profile_res.json()

        email = user_info.get("email")
        name = user_info.get("name")
        picture = None
        pic_data = user_info.get("picture")
        if isinstance(pic_data, dict):
            picture = pic_data.get("data", {}).get("url")

        # 3. Tìm user theo name và is_login="FACEBOOK" (không dùng email)
        existing_user = db.query(User).filter(
            User.full_name == name,
            User.is_login == "FACEBOOK"
        ).first()
        
        if existing_user:
            if existing_user.is_active is False:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tài khoản đã bị khoá")
            db_user = existing_user
            # Nếu user đã có email từ lần trước và giờ Facebook trả về email, cập nhật
            if email and not db_user.email:
                db_user["email"] = email
                db.execute(
                    update(User).where(User.id == db_user.id).values(email)
                )
        else:
            new_user = User(
                email=email,
                full_name=name,
                avatar=picture,
                is_active=True,
                role_id=ROLE_REGISTER_DEFAULT,
                is_login="FACEBOOK",
                password=None  
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            db_user = new_user

        role = jsonable_encoder(db_user.role)
        
        access_token = generate_token(
            data={
                "sub": str(db_user.id),
                "email": db_user.email,
                "role": role['name'],
            }
        )
        login_response = LoginResponseSchema(
            access_token=access_token,
            user_principal=UserSchema.model_validate(db_user)
        )

        return login_response