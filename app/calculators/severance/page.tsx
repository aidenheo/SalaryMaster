import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import SeveranceCalculator from "@/components/calculators/SeveranceCalculator";

const siteUrl = "https://salary-master.example.com";

export const metadata: Metadata = {
  title: "퇴직금 계산기",
  description: "입사일, 퇴사일, 최근 3개월 급여로 평균임금 기준 예상 퇴직금을 계산합니다.",
  alternates: { canonical: "/calculators/severance" },
};

const faqItems = [
  {
    question: "퇴직금은 누가 받을 수 있나요?",
    answer: "계속근로기간이 1년 이상이고 4주 평균 1주 소정근로시간이 15시간 이상인 근로자입니다. 정규직뿐 아니라 계약직, 아르바이트도 조건을 충족하면 받을 수 있습니다.",
  },
  {
    question: "평균임금이란 무엇인가요?",
    answer: "퇴직일 이전 3개월간 지급된 임금총액을 그 기간의 총 일수로 나눈 금액입니다. 기본급뿐 아니라 각종 수당도 포함됩니다.",
  },
  {
    question: "계속근로기간이란 무엇인가요?",
    answer: "입사일부터 퇴사일까지 근로관계가 유지된 전체 기간입니다. 휴직 기간도 근로관계가 유지되면 대부분 포함됩니다.",
  },
  {
    question: "상여금은 퇴직금 계산에 포함되나요?",
    answer: "퇴직 전 1년간 지급된 상여금의 3/12에 해당하는 금액이 평균임금 계산에 포함됩니다.",
  },
  {
    question: "실제 지급액과 계산 결과가 다른 이유는 무엇인가요?",
    answer: "회사의 급여 규정, 통상임금과 평균임금 비교 적용, 미사용 연차수당 반영 방식에 따라 실제 지급액이 달라질 수 있습니다. 이 계산기는 참고용 예상치입니다.",
  },
];

export default function SeverancePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "퇴직금 계산기" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">퇴직금 계산기</h1>
      <p className="mt-2 text-base text-muted">입사일과 퇴사일, 최근 급여를 입력하면 예상 퇴직금을 계산합니다.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <SeveranceCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">퇴직금 계산 기준</h2>
          <p className="text-sm leading-relaxed text-muted">
            퇴직금은 1일 평균임금 × 30일 × (계속근로일수 ÷ 365)로 계산합니다. 단순히 &quot;월급 ×
            근속연수&quot;로 계산하지 않고, 실제 지급된 임금을 기준으로 한 평균임금을 사용합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">실제 지급액과 차이가 나는 이유</h2>
          <p className="text-sm leading-relaxed text-muted">
            평균임금이 통상임금보다 낮게 계산되는 경우 통상임금을 기준으로 지급해야 하는데, 이
            계산기는 이 비교 과정을 반영하지 않습니다. 정확한 금액은 회사의 급여대장을 기준으로
            확인하는 것이 좋습니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="severance" />
      </div>
    </div>
  );
}
