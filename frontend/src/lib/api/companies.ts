const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type EnvelopeResponse<T> = {
  success: boolean;
  data: T | null;
  meta: {
    requestId: string | null;
  };
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  } | null;
};

export type CompanySearchItem = {
  companyId: string;
  name: string;
  ticker: string;
  market: string;
  industry: string;
};

export type StatusBadge = {
  label: string;
  tone: string;
};

export type SnapshotMetric = {
  label: string;
  value: string;
  change?: string | null;
};

export type CompanyOverviewResponse = {
  companyId: string;
  name: string;
  ticker: string;
  market: string;
  sector: string;
  industry: string;
  description: string;
  statusBadges: StatusBadge[];
  snapshotMetrics: SnapshotMetric[];
};

async function handleResponse<T>(response: Response): Promise<T> {
  const json: EnvelopeResponse<T> = await response.json();

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error?.message || "API 요청 중 오류가 발생했습니다.");
  }

  return json.data;
}

export async function searchCompanies(q: string): Promise<CompanySearchItem[]> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
  }

  const response = await fetch(
    `${BASE_URL}/companies/search?q=${encodeURIComponent(q)}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return handleResponse<CompanySearchItem[]>(response);
}

export async function getCompanyOverview(companyId: string): Promise<CompanyOverviewResponse> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
  }

  const response = await fetch(
    `${BASE_URL}/companies/${companyId}/overview`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return handleResponse<CompanyOverviewResponse>(response);
}
