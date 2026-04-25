import './globals.css';
import QueryProvider from '@/components/providers/query-provider';

export const metadata = {
  title: 'Bonjil',
  description: 'Research-first investment OS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
