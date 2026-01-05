from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware  
from starlette.responses import JSONResponse
from fastapi import HTTPException, status
from utils.auth import validate_token
from config.config import settings
from config.database import SessionLocal
from models.user import User
from config.context import current_user

async def authenticate_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Thiếu hoặc sai định dạng token")

    token = auth_header.split(" ")[1]
    if not token:
        raise HTTPException(status_code=401, detail="Phiên đăng nhập không hợp lệ hoặc đã hết hạn.")

    decoded_token = validate_token(token)
    email = decoded_token.get("email")
    user_id = decoded_token.get("id")

    # Tạo database session cho request này
    db = SessionLocal()
    try:
        user = None
        # Ưu tiên tìm bằng email (Google/NORMAL login)
        if email:
            user = db.query(User).filter(User.email == email).first()
        
        if not user and user_id:
            user = db.query(User).filter(User.id == int(user_id)).first()
        
        if not user:
            raise HTTPException(status_code=401, detail="Không tìm thấy người dùng")
        
        if not user.is_active:
            raise HTTPException(status_code=403, detail="Tài khoản đã bị khoá")
        current_user.set(user)
        request.state.user = user
    finally:
        db.close()


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.__exact_path_rules = self.process_path_rules(self.__disable_auth_paths, add_prefix=True)
        self.__prefix_path_rules = self.process_path_rules(self.__prefix_paths, add_prefix=True)

        for path in self.__swagger_paths:
            self.__exact_path_rules[path] = None

    __disable_auth_paths = [
        "/auth/login",
        "/auth/register",  
        "/demo",
        "/auth/google/login",
        "/auth/google/callback",
        "/auth/facebook/login",
        "/auth/facebook/callback" 
    ]

    __prefix_paths = [
        ("/brands/logo/", ["GET"]),  
    ]

    __swagger_paths = ["/docs", "/redoc", "/openapi.json"]

    @staticmethod
    def process_path_rules(paths, add_prefix=True):
        """
        Xử lý danh sách paths thành dictionary rules.
        Tự động thêm cả path có và không có API_PREFIX để hỗ trợ cả 2 trường hợp.
        
        Args:
            paths: List các path hoặc tuple (path, [methods])
            add_prefix: Có thêm API_PREFIX vào path không
        
        Returns:
            dict: {path: set(methods) hoặc None}
                - None nghĩa là bypass tất cả methods
                - set(methods) nghĩa là chỉ bypass các methods trong set
        """
        rules = {}
        for item in paths:
            if isinstance(item, str):
                # Path đơn giản: bypass tất cả methods
                # Thêm cả path có và không có prefix
                rules[item] = None  # Path gốc (không có prefix)
                if add_prefix:
                    path_with_prefix = settings.API_PREFIX + item
                    rules[path_with_prefix] = None  # Path có prefix
            elif isinstance(item, tuple) and len(item) == 2:
                # Path với methods cụ thể: (path, [methods])
                path_str, method = item
                methods_set = set(method) if method else None
                # Thêm cả path có và không có prefix
                rules[path_str] = methods_set  # Path gốc (không có prefix)
                if add_prefix:
                    path_with_prefix = settings.API_PREFIX + path_str
                    rules[path_with_prefix] = methods_set  # Path có prefix
        return rules

    def should_bypass_auth(self, path: str, method: str) -> bool:
        if path in self.__exact_path_rules:
            methods = self.__exact_path_rules[path]
            bypass = methods is None or method in methods
            if bypass:
                return True

        for prefix, methods in self.__prefix_path_rules.items():
            if path.rstrip("/").startswith(prefix.rstrip("/")):
                if methods is None or method in methods:
                    return True

        return False

    async def dispatch(self, request: Request, call_next):
        try:
            path = request.url.path
            method = request.method
            
            # Always bypass authentication for OPTIONS requests (CORS preflight)
            if method == "OPTIONS":
                return await call_next(request)
            
            if not self.should_bypass_auth(path, method):
                await authenticate_user(request)

            return await call_next(request)

        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code,
                content={"success": False, "message": e.detail}
            )