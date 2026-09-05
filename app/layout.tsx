import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = "https://salary-master.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "급여계산기 | 2026년 월급·연봉 실수령액, 노동법 계산",
    template: "%s | 급여계산기",
  },
  description:
    "월급·연봉 실수령액, 주휴수당, 퇴직금, 연차수당, 시급, 최저임금, 연장·야간·휴일수당까지 2026년 기준으로 계산합니다.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "급여계산기",
    title: "급여계산기 | 2026년 월급·연봉 실수령액, 노동법 계산",
    description: "직장인과 아르바이트생을 위한 급여·노동법 계산기 모음. 2026년 기준.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "급여계산기",
    url: siteUrl,
  };

  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
