# NextLap Backend API

Backend API được xây dựng với FastAPI, SQLAlchemy 2.x và Alembic cho MySQL.

## 🚀 Tech Stack

- **FastAPI** - Modern, fast web framework
- **SQLAlchemy 2.x** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **MySQL** - Database
- **Pydantic** - Data validation
- **Python 3.11+**

## 📁 Cấu trúc dự án

```
backend/
├── alembic/              # Database migrations
│   ├── versions/         # Migration files
│   └── env.py
├── config/               # Configuration
│   ├── config.py         # Settings từ .env
│   └── database.py       # Database setup
├── models/               # SQLAlchemy Models
│   ├── brand.py
│   ├── category.py
│   ├── product.py
│   ├── product_spec.py
│   ├── user.py
│   ├── roles.py
│   ├── order.py
│   ├── order_item.py
│   ├── payment.py
│   ├── cart.py
│   └── cart_item.py
├── routers/              # API Routes
├── schemas/              # Pydantic Schemas
├── utils/                # Utilities
├── main.py               # FastAPI app entry point
├── requirements.txt      # Dependencies
├── .env.example          # Example environment variables
├── demo_data.sql         # Demo data cho database
└── .gitignore
```

## ⚙️ Cài đặt

### 1. Tạo virtual environment

```bash
python -m venv venv
```

### 2. Kích hoạt virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Cài đặt dependencies

```bash
pip install -r requirements.txt
```

### 4. Cấu hình environment variables

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các giá trị trong `.env`:

```env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/phone_store
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### 5. Tạo database

Tạo database MySQL:

```sql
CREATE DATABASE phone_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Chạy migrations

```bash
# Tạo migration (nếu chưa có)
alembic revision --autogenerate -m "init"

# Áp dụng migrations
alembic upgrade head
```

### 7. Import demo data (optional)

```bash
mysql -u your_user -p phone_store < demo_data.sql
```

Hoặc chạy trực tiếp trong MySQL client.

### 8. Chạy server

```bash
uvicorn main:app --reload
```

Server sẽ chạy tại: `http://127.0.0.1:8000`

API Documentation:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## 📝 Database Models

- **Brands** - Thương hiệu
- **Categories** - Danh mục sản phẩm
- **Products** - Sản phẩm
- **ProductSpecs** - Thông số kỹ thuật sản phẩm
- **Users** - Người dùng
- **Roles** - Vai trò người dùng
- **Orders** - Đơn hàng
- **OrderItems** - Chi tiết đơn hàng
- **Payments** - Thanh toán
- **Carts** - Giỏ hàng
- **CartItems** - Sản phẩm trong giỏ hàng

## 🔧 Development

### Tạo migration mới

```bash
alembic revision --autogenerate -m "description"
alembic upgrade head
```

### Rollback migration

```bash
alembic downgrade -1
```

### Xem lịch sử migrations

```bash
alembic history
```

## 📄 License

MIT
