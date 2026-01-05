from fastapi import APIRouter, Depends
from schemas.dashboard_schema import DashboardStatsSchema
from sqlalchemy.orm import Session
from schemas.base_schema import DataResponse
from services.dashboard_service import DashboardService
from config.database import get_db
from schemas.dashboard_schema import RevenueDataPointSchema
from schemas.dashboard_schema import ProductSalesDataPointSchema

dashboard_router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
)

@dashboard_router.get("/stats", response_model=DataResponse[DashboardStatsSchema])
async def get_stats(db: Session = Depends(get_db)):
    stats = DashboardService.get_stats(db)
    
    return DataResponse.custom_response(
        data=stats,
        code="200",
        message="get dashboard stats success"
    )

@dashboard_router.get("/revenues-chart", response_model=DataResponse[list[RevenueDataPointSchema]])
async def get_revenues_chart(year: int, db: Session = Depends(get_db)):
    revenues_data = DashboardService.get_revenues_chart(year, db)
    
    return DataResponse.custom_response(
        data=revenues_data,
        code="200",
        message="get revenues chart data success"
    )
    
@dashboard_router.get("/products-sales-chart", response_model=DataResponse[list[ProductSalesDataPointSchema]])
async def get_products_sales_chart(year: int, db: Session = Depends(get_db)):
    products_sales_data = DashboardService.get_products_sales_chart(year, db)
    
    return DataResponse.custom_response(
        data=products_sales_data,
        code="200",
        message="get products sales chart data success"
    )