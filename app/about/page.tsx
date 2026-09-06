import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "소개",
  description: "급여계산기는 월급·연봉 실수령액과 노동법 관련 수당을 계산하는 서비스입니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "소개" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading">소개</h1>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">이 사이트는 무엇을 하나요?</h2>
          <p>
            급여계산기는 대한민국 직장인과 아르바이트생을 위한 급여·노동법 계산 서비스입니다. 월급과
            연봉의 실수령액, 주휴수당, 퇴직금, 연차수당, 시급, 최저임금, 연장·야간·휴일수당을
            계산할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">계산 기준</h2>
          <p>
            4대보험료율은 국민연금공단, 국민건강보험공단, 고용노동부의 고시를 기준으로 하며,
            소득세는 소득세법상 근로소득공제·인적공제·세율표를 기준으로 계산합니다. 근로시간,
            연차, 퇴직금 관련 기준은 근로기준법과 근로자퇴직급여보장법을 따릅니다. 모든 기준은
            2026년 기준이며, 법령·요율이 변경되면 순차적으로 업데이트합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">개인정보 처리 방식</h2>
          <p>
            모든 계산은 사용자의 브라우저에서 처리되며 입력한 급여 정보는 서버로 전송되거나
            저장되지 않습니다. 자세한 내용은 개인정보처리방침 페이지에서 확인할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-heading">유의사항</h2>
          <p>
            이 사이트는 법률·세무·노무 전문가의 상담을 대신하지 않습니다. 계산 결과는 입력한 조건과
            2026년 기준 자료에 따른 예상값이며, 실제 급여명세서나 사업장 계산 결과와 차이가 있을 수
            있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
