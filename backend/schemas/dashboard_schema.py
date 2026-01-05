from pydantic import BaseModel


class DashboardStatsSchema(BaseModel):
    total_customers: int
    total_brands: int
    total_products: int
    total_revenues: float
    
class RevenueDataPointSchema(BaseModel):
    month: int
    revenue: float
    
class ProductSalesDataPointSchema(BaseModel):
    month: int
    total_sold: int