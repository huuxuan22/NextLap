"""Auth Service - Business logic layer for authentication"""
from sqlalchemy.orm import Session
from models.user import User
from schemas.user_schemas import RegisterSchema, LoginSchemas, LoginResponseSchema, UserSchema
from constants.role import ROLE_REGISTER_DEFAULT
from utils.password import hash_password, verify_password
from utils.auth import generate_token
from fastapi.encoders import jsonable_encoder


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

