from typing import List

from app.schemas.company import (
    CompanyInfo,
    CompanyOverviewResponse,
    CompanySearchItem,
    SnapshotMetric,
    StatusBadge,
)


class CompanyService:
    def search_companies(self, query: str) -> List[CompanySearchItem]:
        companies = [
            CompanySearchItem(
                companyId="005930",
                name="삼성전자",
                ticker="005930",
                market="KOSPI",
                industry="반도체, 전자제품",
            ),
            CompanySearchItem(
                companyId="000660",
                name="SK하이닉스",
                ticker="000660",
                market="KOSPI",
                industry="반도체",
            ),
        ]

        if not query:
            return companies

        query_lower = query.lower()
        return [
            company
            for company in companies
            if query_lower in company.name.lower()
            or query_lower in company.ticker.lower()
            or query_lower in company.companyId.lower()
        ]

    def get_company_overview(self, company_id: str) -> CompanyOverviewResponse:
        if company_id == "005930":
            return CompanyOverviewResponse(
                company=CompanyInfo(
                    companyId="005930",
                    name="삼성전자",
                    ticker="005930",
                    market="KOSPI",
                    industry="반도체, 전자제품",
                ),
                headlineSummary="삼성전자는 글로벌 반도체 및 전자제품 시장에서 핵심적인 경쟁력을 보유한 대형주입니다.",
                statusBadges=[
                    StatusBadge(label="Large Cap", severity="info"),
                    StatusBadge(label="반도체 대표주", severity="info"),
                    StatusBadge(label="실적 변동성 점검", severity="review"),
                ],
                snapshotMetrics=[
                    SnapshotMetric(
                        key="revenue",
                        label="매출",
                        value=258.9,
                        formattedValue="258.9조원",
                        unit="KRW_TRILLION",
                    ),
                    SnapshotMetric(
                        key="operating_profit",
                        label="영업이익",
                        value=6.57,
                        formattedValue="6.57조원",
                        unit="KRW_TRILLION",
                    ),
                    SnapshotMetric(
                        key="roe",
                        label="ROE",
                        value=4.15,
                        formattedValue="4.15%",
                        unit="PERCENT",
                    ),
                    SnapshotMetric(
                        key="per",
                        label="PER",
                        value=18.2,
                        formattedValue="18.2배",
                        unit="MULTIPLE",
                    ),
                ],
                aiSummary="메모리 반도체 업황 회복 기대감이 있으나, 단기 실적 변동성과 업황 사이클에 대한 점검이 필요합니다.",
            )

        return CompanyOverviewResponse(
            company=CompanyInfo(
                companyId=company_id,
                name="알 수 없는 기업",
                ticker=company_id,
                market="UNKNOWN",
                industry=None,
            ),
            headlineSummary="해당 기업에 대한 요약 정보가 아직 준비되지 않았습니다.",
            statusBadges=[
                StatusBadge(label="데이터 준비중", severity="review"),
            ],
            snapshotMetrics=[],
            aiSummary="추후 실제 데이터 소스 연동 시 상세 정보가 제공될 예정입니다.",
        )
