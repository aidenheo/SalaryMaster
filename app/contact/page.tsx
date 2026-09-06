import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "문의",
  description: "급여계산기에 대한 문의 방법을 안내합니다.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "문의" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading">문의</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        계산 오류 신고, 기능 제안, 제휴 문의는 아래 이메일로 보내주세요.
      </p>

      <div className="mt-6 rounded-md border border-border bg-surface p-5 text-sm">
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline">
            {contactEmail}
          </a>
        ) : (
          <p className="text-muted">
            문의 이메일 주소가 아직 설정되지 않았습니다. 운영자는 <code>NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
            환경변수에 실제 이메일 주소를 설정해 이 페이지에 표시할 수 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}
