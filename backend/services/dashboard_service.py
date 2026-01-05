from sqlalchemy.orm import Session
from models.user import User
from models.order import Order
from models.product import Product
from models.brand import Brand
from models.order_item import OrderItem
from sqlalchemy import func
from sqlalchemy.sql import extract


class DashboardService:
    
    @staticmethod
    def get_stats(db: Session) -> dict:
        total_users = db.query(User).filter(User.role_id == 2).count()
        total_brands = db.query(Brand).count()
        total_products = db.query(Product).count()
        total_revenues = (db.query(func.sum(Order.total))
                            .filter(Order.status == "COMPLETED")
                            .scalar()) or 0.0
        
        return {
            "total_customers": total_users,
            "total_brands": total_brands,
            "total_products": total_products,
            "total_revenues": total_revenues
        }
        
    
    @staticmethod
    def get_revenues_chart(year:int, db: Session) -> list:
        results = (
        db.query(
            extract("month", Order.created_at).label("month"),
            func.sum(Order.total).label("revenue")
        )
        .filter(
            Order.status == "COMPLETED",
            extract("year", Order.created_at) == year
        )
        .group_by("month")
        .order_by("month")
        .all()
    )
        
        revenues_dict = {}
        for r in results:
            revenues_dict[r.month] = r.revenue
            
        revenues_data = []
        
        for month in range(1, 13):
            revenues_data.append({
                "month": month,
                "revenue": revenues_dict.get(month, 0)
            })
        
        return revenues_data
    
    @staticmethod
    def get_products_sales_chart(year:int, db: Session) -> list:
        results = (
        db.query(
            extract("month", Order.created_at).label("month"),
             func.sum(OrderItem.quantity).label("total_sold")
        )
        .filter(
            Order.status == "COMPLETED",
            extract("year", Order.created_at) == year
        )
        .group_by("month")
        .order_by("month")
        .all()
    )
        
        sales_dict = {}
        for r in results:
            sales_dict[r.month] = r.total_sold
            
        sales_data = []
        
        for month in range(1, 13):
            sales_data.append({
                "month": month,
                "total_sold": sales_dict.get(month, 0)
            })
        
        return sales_data

        
        