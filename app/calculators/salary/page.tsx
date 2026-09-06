import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "월급 실수령액 계산기",
  description:
    "월급을 입력하면 국민연금, 건강보험, 장기요양보험, 고용보험, 소득세를 반영해 2026년 기준 예상 실수령액을 계산합니다.",
  alternates: { canonical: "/calculators/salary" },
};

const faqItems = [
  {
    question: "월급과 연봉 중 어떤 금액을 입력해야 하나요?",
    answer: "이 계산기는 세전 월급을 기준으로 합니다. 연봉만 알고 있다면 연봉 실수령액 계산기를 사용하세요.",
  },
  {
    question: "비과세 식대는 어떻게 입력하나요?",
    answer:
      "식대는 월 20만원까지 비과세로 인정됩니다. 회사에서 별도로 식대를 지급한다면 비과세 급여 칸에 해당 금액을 입력하세요. 식대 외에 자가운전보조금 등 다른 비과세 항목이 있다면 합산해서 입력해도 됩니다.",
  },
  {
    question: "계산 결과가 실제 급여명세서와 다른 이유는 무엇인가요?",
    answer:
      "국세청이 실제 원천징수에 사용하는 간이세액표는 이 계산기가 사용하는 소득세법상 공제·세율 산식과 세부 산정 방식이 다릅니다. 또한 회사마다 수당 구성, 비과세 처리 기준이 달라 결과가 다소 차이 날 수 있습니다.",
  },
  {
    question: "부양가족 수는 어떻게 입력하나요?",
    answer: "본인을 포함한 기본공제 대상 가족 수를 입력합니다. 배우자, 부모님, 자녀 등 실제로 공제받는 인원을 더하면 됩니다.",
  },
  {
    question: "2026년 기준인가요?",
    answer: "네. 국민연금 9.5%, 건강보험 7.19%, 장기요양보험 0.9448%, 고용보험 0.9% 등 2026년 고시 요율을 기준으로 계산합니다.",
  },
];

export default function SalaryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        baseUrl={siteUrl}
        items={[
          { label: "홈", href: "/" },
          { label: "월급 실수령액 계산기" },
        ]}
      />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">월급 실수령액 계산기</h1>
      <p className="mt-2 text-base text-muted">
        월급을 입력하면 4대보험과 세금을 뺀 예상 실수령액을 바로 계산합니다.
      </p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <SalaryCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">실수령액이란?</h2>
          <p className="text-sm leading-relaxed text-muted">
            실수령액은 세전 월급에서 4대보험료와 세금을 뺀, 실제로 통장에 들어오는 금액입니다.
            같은 월급이라도 부양가족 수, 비과세 항목에 따라 실수령액이 달라집니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">월급에서 빠지는 돈</h2>
          <p className="text-sm leading-relaxed text-muted">
            월급에서는 국민연금, 건강보험, 장기요양보험, 고용보험(4대보험)과 소득세, 지방소득세가
            공제됩니다. 4대보험은 회사와 근로자가 절반씩 부담하며, 이 계산기는 근로자가 실제로
            부담하는 금액만 계산합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">4대보험은 어떻게 계산되는가?</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>국민연금: 과세 대상 급여의 4.75% (기준소득월액 41만원~659만원 범위 내에서 산정)</li>
            <li>건강보험: 과세 대상 급여의 3.595%</li>
            <li>장기요양보험: 건강보험료의 13.14%</li>
            <li>고용보험: 과세 대상 급여의 0.9%</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">비과세 급여란?</h2>
          <p className="text-sm leading-relaxed text-muted">
            식대, 자가운전보조금 등 일부 항목은 소득세법에 따라 일정 한도까지 세금이 붙지 않습니다.
            비과세 급여는 4대보험료와 소득세 계산 대상에서 모두 제외됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">부양가족에 따라 세금이 달라지는 이유</h2>
          <p className="text-sm leading-relaxed text-muted">
            소득세법은 부양가족 1인당 150만원을 소득에서 공제해줍니다. 부양가족이 많을수록 과세표준이
            낮아져 소득세가 줄어듭니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 결과가 급여명세서와 다른 이유</h2>
          <p className="text-sm leading-relaxed text-muted">
            국세청의 근로소득 간이세액표는 급여 구간별로 미리 계산된 표를 사용하지만, 이 계산기는
            소득세법상 산정 구조를 직접 적용한 추정값을 보여줍니다. 두 방식의 세부 산식 차이로
            매월 원천징수세액과 다소 차이가 날 수 있습니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="salary" />
      </div>
    </div>
  );
}
