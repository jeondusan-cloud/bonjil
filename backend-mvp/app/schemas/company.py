from typing import List, Optional
from pydantic import BaseModel


class CompanySearchItem(BaseModel):
    companyId: str
    name: str
    ticker: str
    market: str
    industry: Optional[str] = None


class StatusBadge(BaseModel):
    label: str
    severity: str


class SnapshotMetric(BaseModel):
    key: str
    label: str
    value: Optional[float] = None
    formattedValue: str
    unit: Optional[str] = None


class CompanyInfo(BaseModel):
    companyId: str
    name: str
    ticker: str
    market: str
    industry: Optional[str] = None


class CompanyOverviewResponse(BaseModel):
    company: CompanyInfo
    headlineSummary: str
    statusBadges: List[StatusBadge]
    snapshotMetrics: List[SnapshotMetric]
    aiSummary: str
