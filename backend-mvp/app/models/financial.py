from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class FinancialStatementAnnual(Base):
    __tablename__ = "financial_statements_annual"
    __table_args__ = (
        UniqueConstraint("company_id", "fiscal_year", "basis", name="uq_fin_stmt_company_year_basis"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    company_id: Mapped[str] = mapped_column(ForeignKey("companies.company_id"), nullable=False, index=True)
    fiscal_year: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    basis: Mapped[str] = mapped_column(String(30), nullable=False, index=True)  # consolidated / separate

    revenue: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    operating_income: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    net_income: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    operating_cash_flow: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    investing_cash_flow: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    financing_cash_flow: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    total_assets: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    total_liabilities: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    total_equity: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    inventory: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    accounts_receivable: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    interest_expense: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    capex: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    shares_outstanding: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)

    source_filing_id: Mapped[str | None] = mapped_column(String(100), nullable=True)

    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    company = relationship("Company", back_populates="financial_statements")


class DerivedMetricAnnual(Base):
    __tablename__ = "derived_metrics_annual"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    company_id: Mapped[str] = mapped_column(ForeignKey("companies.company_id"), nullable=False, index=True)
    fiscal_year: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    basis: Mapped[str] = mapped_column(String(30), nullable=False, index=True)

    op_margin: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    net_margin: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    roe: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    roic: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    debt_ratio: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    net_debt: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    fcf: Mapped[float | None] = mapped_column(Numeric(20, 2), nullable=True)
    revenue_growth_yoy: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    op_income_growth_yoy: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    share_count_growth_yoy: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)
    ocf_to_op_income_ratio: Mapped[float | None] = mapped_column(Numeric(10, 4), nullable=True)

    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    company = relationship("Company", back_populates="derived_metrics")
