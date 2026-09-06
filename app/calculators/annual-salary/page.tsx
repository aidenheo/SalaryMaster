import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import AnnualSalaryCalculator from "@/components/calculators/AnnualSalaryCalculator";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기",
  description: "연봉을 입력하면 월 실수령액과 연간 실수령액을 2026년 4대보험·세금 기준으로 계산합니다.",
  alternates: { canonical: "/calculators/annual-salary" },
};

const faqItems = [
  {
    question: "연봉에는 상여금도 포함해서 입력하나요?",
    answer:
      "네. 연봉계약서에 적힌 총 연봉(상여금, 고정수당 포함)을 입력하면 12개월로 나눠 월 기준으로 계산합니다. 실제로는 상여금 지급 시기에 따라 월별 수령액이 달라질 수 있습니다.",
  },
  {
    question: "세전 연봉과 실수령 연봉 중 무엇을 입력해야 하나요?",
    answer: "세전(공제 전) 연봉을 입력해야 합니다. 실수령액은 계산 결과로 확인할 수 있습니다.",
  },
  {
    question: "월급 계산기와 결과가 다른가요?",
    answer: "연봉을 12로 나눈 값을 월급 계산기와 동일한 방식으로 계산하므로 조건이 같다면 결과도 같습니다.",
  },
  {
    question: "퇴직금은 연봉에 포함되어 있나요?",
    answer: "포함 여부는 회사마다 다릅니다. 연봉제 계약서에 퇴직금 포함 여부가 명시되어 있는지 확인하세요.",
  },
  {
    question: "2026년 기준인가요?",
    answer: "네. 2026년 4대보험 요율과 소득세법 기준을 적용합니다.",
  },
];

export default function AnnualSalaryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        baseUrl={siteUrl}
        items={[
          { label: "홈", href: "/" },
          { label: "연봉 실수령액 계산기" },
        ]}
      />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">연봉 실수령액 계산기</h1>
      <p className="mt-2 text-base text-muted">연봉을 입력하면 월과 연간 예상 실수령액을 계산합니다.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <AnnualSalaryCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">연봉과 월급 실수령액의 관계</h2>
          <p className="text-sm leading-relaxed text-muted">
            연봉제라도 매달 받는 급여는 결국 연봉을 12로 나눈 금액을 기준으로 공제됩니다. 이 계산기는
            월급 실수령액 계산기와 같은 계산 엔진을 사용해 월/연간 결과를 함께 보여줍니다.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">연봉 협상 시 참고할 점</h2>
          <p className="text-sm leading-relaxed text-muted">
            같은 연봉이라도 비과세 항목 구성, 부양가족 수에 따라 실수령액이 달라집니다. 이직이나
            연봉 협상 전에 조건을 바꿔가며 비교해보면 도움이 됩니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="annual-salary" />
      </div>
    </div>
  );
}
