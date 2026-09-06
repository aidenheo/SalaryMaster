import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "급여계산기의 개인정보 처리방침입니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "개인정보처리방침" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading">개인정보처리방침</h1>
      <p className="mt-2 text-xs text-muted">시행일: 2026년 1월 1일</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">1. 수집하는 개인정보</h2>
          <p>
            급여계산기는 회원가입 없이 이용할 수 있으며, 계산기에 입력하는 급여·근무 정보는 모두
            사용자의 브라우저에서만 처리됩니다. 이 정보는 서버로 전송되거나 저장되지 않으며, 운영자는
            사용자가 입력한 금액이나 계산 결과를 확인할 수 없습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">2. 문의 시 수집되는 정보</h2>
          <p>
            문의 페이지를 통해 이메일로 문의할 경우 이용자가 보낸 이메일 주소와 문의 내용만 확인
            목적으로 처리하며, 문의 처리 완료 후 별도로 보관하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">3. 쿠키 및 분석 도구</h2>
          <p>
            현재 이 사이트는 방문자 분석 도구나 광고를 사용하지 않습니다. 향후 Google AdSense 광고를
            게재할 경우 Google 및 파트너사가 쿠키를 이용해 광고를 게재할 수 있으며, 이 경우 본
            방침을 갱신해 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">4. 브라우저 저장소</h2>
          <p>
            일부 계산기는 사용자 편의를 위해 브라우저의 로컬 저장소에 최근 입력값을 저장할 수
            있습니다. 이 정보는 사용자의 기기에만 저장되며 외부로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">5. 문의처</h2>
          <p>
            개인정보 처리에 관한 문의는 <a className="text-primary underline" href="/contact">문의 페이지</a>를
            통해 연락해주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
