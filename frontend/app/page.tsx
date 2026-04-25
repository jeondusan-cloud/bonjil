import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Bonjil Frontend</h1>
      <p className="mt-3 text-gray-600">회사 Overview MVP 진입 페이지</p>

      <div className="mt-6">
        <Link
          href="/companies/005930"
          className="inline-block rounded-lg border px-4 py-2"
        >
          삼성전자 Overview 보기
        </Link>
      </div>
    </main>
  );
}
