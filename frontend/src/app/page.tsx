"use client";

import { useState } from "react";
import {
  searchCompanies,
  getCompanyOverview,
  CompanySearchItem,
  CompanyOverviewResponse,
} from "@/lib/api/companies";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanySearchItem[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyOverviewResponse | null>(null);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [error, setError] = useState("");

  const onSearch = async () => {
    if (!query.trim()) return;

    try {
      setError("");
      setSelectedCompany(null);
      setLoadingSearch(true);

      const data = await searchCompanies(query);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "검색 중 오류가 발생했습니다.");
      setResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const onSelectCompany = async (companyId: string) => {
    try {
      setError("");
      setLoadingOverview(true);

      const data = await getCompanyOverview(companyId);
      setSelectedCompany(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "상세 조회 중 오류가 발생했습니다.");
      setSelectedCompany(null);
    } finally {
      setLoadingOverview(false);
    }
  };

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Bonjil MVP
      </h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
          회사 검색
        </h2>

        <div style={{ display: "flex", gap: 12 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="회사명 또는 티커 입력"
            style={{
              flex: 1,
              height: 44,
              padding: "0 12px",
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />
          <button
            onClick={onSearch}
            disabled={loadingSearch}
            style={{
              height: 44,
              padding: "0 16px",
              borderRadius: 8,
              border: "none",
              backgroundColor: "#111827",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {loadingSearch ? "검색 중..." : "검색"}
          </button>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: 12 }}>
            {error}
          </p>
        )}

        {!loadingSearch && results.length === 0 && query.trim() && !error && (
          <p style={{ marginTop: 12 }}>검색 결과가 없습니다.</p>
        )}

        {results.length > 0 && (
          <ul style={{ marginTop: 20, padding: 0, listStyle: "none" }}>
            {results.map((company) => (
              <li
                key={company.companyId}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  <strong>{company.name}</strong> ({company.ticker})
                </div>
                <div style={{ color: "#4b5563", marginBottom: 8 }}>
                  {company.market} · {company.industry}
                </div>
                <button
                  onClick={() => onSelectCompany(company.companyId)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                  }}
                >
                  상세 보기
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
          회사 상세
        </h2>

        {loadingOverview && <p>상세 정보를 불러오는 중...</p>}

        {!loadingOverview && !selectedCompany && (
          <p>회사를 선택하면 상세 정보가 표시됩니다.</p>
        )}

        {selectedCompany && (
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              {selectedCompany.name} ({selectedCompany.ticker})
            </h3>

            <p style={{ color: "#4b5563", marginBottom: 8 }}>
              {selectedCompany.market} · {selectedCompany.sector} · {selectedCompany.industry}
            </p>

            <p style={{ marginBottom: 16 }}>
              {selectedCompany.description}
            </p>

            <div style={{ marginBottom: 20 }}>
              <strong>상태 배지</strong>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {selectedCompany.statusBadges.map((badge, index) => (
                  <span
                    key={`${badge.label}-${index}`}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 9999,
                      backgroundColor: "#f3f4f6",
                      fontSize: 14,
                    }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <strong>스냅샷 지표</strong>
              <ul style={{ marginTop: 12 }}>
                {selectedCompany.snapshotMetrics.map((metric, index) => (
                  <li key={`${metric.label}-${index}`} style={{ marginBottom: 8 }}>
                    {metric.label}: {metric.value}
                    {metric.change ? ` (${metric.change})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
