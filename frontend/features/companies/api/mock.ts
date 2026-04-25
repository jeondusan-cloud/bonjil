export const mockCompanyOverview = {
  company: {
    id: '005930',
    name: '삼성전자',
    market: 'KOSPI',
    ticker: '005930',
  },
  oneLineSummary:
    '메모리 반도체와 스마트폰, 디스플레이를 중심으로 글로벌 경쟁력을 가진 대형 IT 기업.',
  statusBadges: [
    { label: '초대형주', tone: 'neutral' },
    { label: '현금창출력 우수', tone: 'positive' },
    { label: '반도체 업황 민감', tone: 'warning' },
  ],
  snapshotMetrics: [
    { label: '매출', value: '258조' },
    { label: '영업이익', value: '6.5조' },
    { label: '영업현금흐름', value: '44조' },
    { label: 'ROE', value: '8.7%' },
    { label: '부채비율', value: '26%' },
    { label: 'PER', value: '18.2' },
  ],
  aiSummary:
    '전방 산업 사이클의 영향을 크게 받지만, 장기적으로는 메모리 경쟁력과 대규모 CAPEX 집행 능력이 핵심 강점이다.',
  risks: [
    '메모리 업황 둔화 시 수익성 급락 가능',
    '대규모 설비투자 부담',
    '글로벌 수요 회복 지연 가능성',
  ],
};
