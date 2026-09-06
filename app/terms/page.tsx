import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "이용약관",
  description: "급여계산기의 이용약관입니다.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "이용약관" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading">이용약관</h1>
      <p className="mt-2 text-xs text-muted">시행일: 2026년 1월 1일</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">1. 서비스 내용</h2>
          <p>
            급여계산기(이하 &quot;서비스&quot;)는 월급·연봉 실수령액, 주휴수당, 퇴직금, 연차수당,
            시급, 최저임금, 연장·야간·휴일수당을 계산해 제공하는 무료 계산 서비스입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">2. 계산 결과의 성격</h2>
          <p>
            서비스가 제공하는 계산 결과는 이용자가 입력한 조건과 서비스가 적용한 계산 기준에 따른
            예상값입니다. 법률·세무·노무 전문가의 상담이나 공식 급여 계산을 대신하지 않으며, 실제
            급여명세서나 사업장의 계산 결과와 다를 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">3. 책임의 한계</h2>
          <p>
            서비스는 계산 기준을 마련할 때 합리적인 주의를 기울이지만, 계산 결과를 근거로 한 이용자의
            판단이나 그로 인해 발생한 손해에 대해 책임을 지지 않습니다. 중요한 의사결정 전에는
            관련 전문가나 관계기관에 별도로 확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">4. 서비스의 변경 및 중단</h2>
          <p>
            운영상 필요에 따라 서비스의 내용을 변경하거나 일시적으로 중단할 수 있으며, 이 경우 사전에
            공지하도록 노력합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">5. 약관의 변경</h2>
          <p>본 약관은 필요 시 개정될 수 있으며, 개정된 약관은 이 페이지에 게시함으로써 효력이 발생합니다.</p>
        </section>
      </div>
    </div>
  );
}
