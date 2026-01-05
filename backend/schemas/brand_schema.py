from pydantic import BaseModel
from typing import Optional

class BrandSchema(BaseModel):
    id : int
    name : str
    country: str

class BrandCreateSchema(BaseModel):
    name : str
    country : str
    
class BrandUpdateSchema(BaseModel):
    name : Optional[str] = None
    country : Optional[str] = None