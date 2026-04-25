from typing import List

from fastapi import APIRouter, Query

from app.schemas.common import EnvelopeResponse, Meta
from app.schemas.company import CompanyOverviewResponse, CompanySearchItem
from app.services.company_service import CompanyService

router = APIRouter(prefix="/companies", tags=["companies"])

company_service = CompanyService()


@router.get("/search", response_model=EnvelopeResponse[List[CompanySearchItem]])
def search_companies(q: str = Query(..., description="회사명 또는 티커")):
    result = company_service.search_companies(q)
    return EnvelopeResponse[List[CompanySearchItem]](
        success=True,
        data=result,
        meta=Meta(),
        error=None,
    )


@router.get("/{company_id}/overview", response_model=EnvelopeResponse[CompanyOverviewResponse])
def get_company_overview(company_id: str):
    result = company_service.get_company_overview(company_id)
    return EnvelopeResponse[CompanyOverviewResponse](
        success=True,
        data=result,
        meta=Meta(),
        error=None,
    )
