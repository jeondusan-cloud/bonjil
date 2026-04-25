from typing import Generic, Optional, TypeVar
from pydantic import BaseModel, Field

try:
    from pydantic.generics import GenericModel
except ImportError:
    GenericModel = BaseModel


T = TypeVar("T")


class Meta(BaseModel):
    request_id: Optional[str] = None


class ErrorResponse(BaseModel):
    code: str
    message: str
    details: Optional[dict] = None


class EnvelopeResponse(GenericModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    meta: Meta = Field(default_factory=Meta)
    error: Optional[ErrorResponse] = None
