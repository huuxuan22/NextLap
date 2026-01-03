from fastapi import APIRouter, Depends
from schemas.brand_schema import BrandSchema, BrandCreateSchema, BrandUpdateSchema
from schemas.base_schema import DataResponse
from typing import List, Optional
from sqlalchemy.orm import Session
from config.database import get_db
from services.brand_service import BrandService
from fastapi import Query
from math import ceil


brand_router = APIRouter(
    prefix="/brands",
    tags=["brands"]
)

@brand_router.get("")
async def get_all_brands(page: Optional[int] = Query(None, ge=1) , limit : Optional[int] = Query(None, ge=1), search: Optional[str] = Query(None),db: Session = Depends(get_db)):
    brands, total = BrandService.get_all_brands(page,limit,search,db) 
    
    if limit:
        total_pages = ceil(total / limit)
    else:
        total_pages = 1

    return {
        "data": brands,
        "code": "200",
        "message": "get brands success",
        "pagination": {
            "page": page,
            "pagesize": limit,
            "total": total,
            "total_pages": total_pages
        }
    }
   
    
@brand_router.get("/{id}",response_model=DataResponse[BrandSchema])
async def get_brand_by_id(id: int, db: Session = Depends(get_db)):
    brand = BrandService.get_brand_by_id(id,db)

    return DataResponse.custom_response(
        data=brand,
        code="200",
        message="get brand by id success"
    )
    
@brand_router.post("",response_model=DataResponse[BrandSchema])
async def create_brand(data : BrandCreateSchema, db: Session = Depends(get_db)):
    new_brand = BrandService.create_brand(data, db)
    
    return DataResponse.custom_response(
        data=new_brand,
        code="201",
        message="create brand success"
    )
    
@brand_router.put("/{id}",response_model=DataResponse[BrandSchema])
async def update_brand(id: int, data : BrandUpdateSchema, db: Session = Depends(get_db)):
    updated_brand = BrandService.update_brand(id, data, db)
    
    if not updated_brand:
        return DataResponse.custom_response(
            data=updated_brand,
            code="404",
            message="brand not found"
        )
    
    return DataResponse.custom_response(
        data=updated_brand,
        code="200",
        message="update brand success"
    )
    
@brand_router.delete("/{id}",response_model=DataResponse[Optional[bool]])
async def delete_brand(id: int, db: Session = Depends(get_db)):
    result = BrandService.delete_brand(id, db)
    
    if not result:
        return DataResponse.custom_response(
            data=result,
            code="404",
            message="brand not found"
        )
    
    return DataResponse.custom_response(
        data=result,
        code="200",
        message="delete brand success"
    )