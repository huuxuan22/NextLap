from typing import Generic, TypeVar, Optional
from pydantic import BaseModel

T = TypeVar('T')


class PaginationInfo(BaseModel):
    """Pagination information schema"""
    skip: int
    limit: int
    total: int
    current_page: int
    total_pages: int
    has_next: bool
    has_prev: bool


class DataResponse(BaseModel, Generic[T]):
    """Base response schema for API responses"""
    data: Optional[T] = None
    code: str = "200"
    message: str = "success"
    pagination: Optional[PaginationInfo] = None

    @classmethod
    def custom_response(
        cls,
        data: Optional[T] = None,
        code: str = "200",
        message: str = "success",
        pagination=None
    ) -> "DataResponse[T]":
        """
        Create a custom DataResponse instance
        
        Args:
            data: Response data (can be any type)
            code: Response code (default: "200")
            message: Response message (default: "success")
            pagination: Pagination info (optional)
        
        Returns:
            DataResponse instance
        """
        return cls(data=data, code=code, message=message, pagination=pagination)

