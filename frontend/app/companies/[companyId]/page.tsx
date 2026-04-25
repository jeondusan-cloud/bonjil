type PageProps = {
  params: Promise<{
    companyId: string;
  }>;
};

export default async function CompanyOverviewPage({ params }: PageProps) {
  const { companyId } = await params;
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

  let overview: any;

  if (useMock) {
    const { mockCompanyOverview } = await import('@/features/companies/api/mock');
    overview = {
      ...mockCompanyOverview,
      company: {
        ...mockCompanyOverview.company,
        id: companyId,
      },
    };
  } else {
    const { apiGet } = await import('@/shared/api/client');
    overview = await apiGet(`/api/v1/companies/${companyId}/overview`);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <section>
        <div className="text-sm text-gray-500">
          {overview.company.market} · {overview.company.ticker}
        </div>
        <h1 className="text-3xl font-bold">{overview.company.name}</h1>
        <p className="mt-3 text-lg text-gray-700">{overview.oneLineSummary}</p>
      </section>

      <section className="flex flex-wrap gap-2">
        {overview.statusBadges.map((badge: any) => (
          <span key={badge.label} className="rounded-full border px-3 py-1 text-sm">
            {badge.label}
          </span>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {overview.snapshotMetrics.map((metric: any) => (
          <div key={metric.label} className="rounded-xl border p-4">
            <div className="text-sm text-gray-500">{metric.label}</div>
            <div className="mt-2 text-xl font-semibold">{metric.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border p-5">
        <h2 className="text-lg font-semibold">AI Summary</h2>
        <p className="mt-3 leading-7 text-gray-700">{overview.aiSummary}</p>
      </section>

      <section className="rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Risk Preview</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          {overview.risks.map((risk: string) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
