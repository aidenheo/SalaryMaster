import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import AnnualLeavePayCalculator from "@/components/calculators/AnnualLeavePayCalculator";

const siteUrl = "https://salary-master.example.com";

export const metadata: Metadata = {
  title: "연차수당 계산기",
  description: "근속기간과 통상임금을 입력하면 발생 연차, 잔여 연차, 예상 연차수당을 계산합니다.",
  alternates: { canonical: "/calculators/annual-leave-pay" },
};

const faqItems = [
  {
    question: "연차는 입사 첫해에도 발생하나요?",
    answer: "네. 입사 1년 미만이라도 매월 개근하면 1일씩, 최대 11일까지 연차가 발생합니다.",
  },
  {
    question: "연차수당은 어떻게 계산하나요?",
    answer: "사용하지 않고 남은 연차일수에 1일 통상임금을 곱해 계산합니다. 통상임금은 기본급과 고정수당을 기준으로 합니다.",
  },
  {
    question: "3년 이상 근무하면 연차가 더 생기나요?",
    answer: "네. 3년차부터 매 2년마다 1일씩 가산되며 최대 25일까지 늘어납니다.",
  },
  {
    question: "연차를 다 쓰면 연차수당이 없나요?",
    answer: "맞습니다. 발생한 연차를 모두 사용했다면 잔여 연차가 없어 수당도 발생하지 않습니다.",
  },
  {
    question: "회사가 연차 사용을 독려했는데도 못 쓰면 어떻게 되나요?",
    answer: "회사가 적법한 절차로 연차 사용을 촉진했는데도 근로자가 사용하지 않았다면 수당 지급 의무가 없을 수 있습니다. 구체적인 판단은 사업장 상황에 따라 다릅니다.",
  },
];

export default function AnnualLeavePayPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "연차수당 계산기" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">연차수당 계산기</h1>
      <p className="mt-2 text-base text-muted">근속기간과 통상임금을 입력하면 예상 연차수당을 계산합니다.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <AnnualLeavePayCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">연차 발생 기준</h2>
          <p className="text-sm leading-relaxed text-muted">
            입사 1년 미만은 매월 개근 시 1일씩(최대 11일), 1년 이상은 15일에 3년차부터 2년마다 1일씩
            가산되어 최대 25일까지 발생합니다. 이 계산기는 이 기준을 그대로 적용합니다.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">통상임금이란?</h2>
          <p className="text-sm leading-relaxed text-muted">
            정기적·일률적으로 지급되는 기본급과 각종 고정수당을 말합니다. 연차수당, 연장근로수당 등
            각종 법정수당 계산의 기준이 됩니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="annual-leave-pay" />
      </div>
    </div>
  );
}
