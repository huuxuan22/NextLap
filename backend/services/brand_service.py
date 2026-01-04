from typing import List, Optional
from sqlalchemy.orm import Session
from models.brand import Brand
from schemas.brand_schema import BrandCreateSchema, BrandUpdateSchema
from sqlalchemy import func
from fastapi import HTTPException, status

class  BrandService : 
    
    @staticmethod
    def get_all_brands(page: Optional[int], limit: Optional[int],search: Optional[str], db: Session) -> List[Brand]:       
        query =  db.query(Brand).filter(Brand.deleted_at == None)
        
        if search:
            query = query.filter(Brand.name.like(f"%{search}%"))
        
        total = query.count()
        
        if page is None or limit is None:
            brands = query.all()
            return brands, total
    
        brands=(query.offset((page-1)*limit)
            .limit(limit)
            .all())
        
        return brands, total
    
    @staticmethod
    def get_brand_by_id(brand_id: int, db: Session) -> Optional[Brand]:
        return db.query(Brand).filter(Brand.id == brand_id).first()
    
    @staticmethod
    def create_brand(data : BrandCreateSchema, db: Session) -> Brand:
      new_brand = Brand(
          name = data.name,
          country = data.country
      )
      
      db.add(new_brand)
      db.commit()
      db.refresh(new_brand)
      
      return new_brand
        
    
    @staticmethod
    def update_brand(brand_id: int, data: BrandUpdateSchema, db: Session) -> Optional[Brand]:
        brand = db.query(Brand).filter(Brand.id == brand_id).first()
        if not brand:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="brand not found")
        
        if data.name is not None:
            brand.name = data.name
        if data.country is not None:
            brand.country = data.country
        
        db.commit()
        db.refresh(brand)
        
        return brand
    
    @staticmethod
    def delete_brand(brand_id: int, db: Session) -> bool:
        brand = db.query(Brand).filter((Brand.id == brand_id) & (Brand.deleted_at==None)).first()
        if not brand:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="brand not found")
        
        brand.deleted_at = func.now()
        db.commit()
        db.refresh(brand)
        
        return True 