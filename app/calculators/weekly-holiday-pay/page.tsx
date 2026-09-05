import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import WeeklyHolidayPayCalculator from "@/components/calculators/WeeklyHolidayPayCalculator";

const siteUrl = "https://salary-master.example.com";

export const metadata: Metadata = {
  title: "주휴수당 계산기",
  description: "시급과 주 근무일수, 근무시간을 입력하면 주휴수당과 예상 주급을 계산합니다.",
  alternates: { canonical: "/calculators/weekly-holiday-pay" },
};

const faqItems = [
  {
    question: "주휴수당이란 무엇인가요?",
    answer: "1주 소정근로일을 개근한 근로자에게 하루치 임금을 유급으로 지급하는 제도입니다. 근로기준법 제55조에 규정되어 있습니다.",
  },
  {
    question: "아르바이트생도 주휴수당을 받을 수 있나요?",
    answer: "네. 고용 형태와 상관없이 1주 소정근로시간이 15시간 이상이고 개근했다면 아르바이트생도 주휴수당 대상입니다.",
  },
  {
    question: "주 15시간을 어떻게 계산하나요?",
    answer: "실제로 근무하기로 정한 시간(소정근로시간)을 기준으로 계산합니다. 주 근무일수 x 1일 근무시간으로 계산한 값이 15시간 이상이어야 합니다.",
  },
  {
    question: "지각이나 조퇴를 하면 주휴수당을 못 받나요?",
    answer: "지각·조퇴는 결근이 아니므로 개근으로 인정됩니다. 다만 무단결근이 있으면 그 주는 주휴수당이 발생하지 않을 수 있습니다.",
  },
  {
    question: "퇴사하는 주에도 주휴수당을 받을 수 있나요?",
    answer: "퇴사일이 그 주의 소정근로일을 모두 채운 이후라면 주휴수당이 발생할 수 있습니다. 다만 구체적인 판단은 근무 조건에 따라 달라질 수 있습니다.",
  },
];

export default function WeeklyHolidayPayPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "주휴수당 계산기" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">주휴수당 계산기</h1>
      <p className="mt-2 text-base text-muted">시급과 근무 조건을 입력하면 주휴수당을 계산합니다.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <WeeklyHolidayPayCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">누가 받을 수 있는가?</h2>
          <p className="text-sm leading-relaxed text-muted">
            1주 소정근로시간이 15시간 이상이고 그 주의 소정근로일을 개근한 근로자입니다. 정규직,
            계약직, 아르바이트 등 고용 형태와 무관하게 적용됩니다.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">어떻게 계산하는가?</h2>
          <p className="text-sm leading-relaxed text-muted">
            주휴시간은 (주 근무시간 ÷ 40시간) × 8시간으로 계산하며 최대 8시간을 넘지 않습니다.
            주휴수당은 주휴시간에 시급을 곱한 금액입니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="weekly-holiday-pay" />
      </div>
    </div>
  );
}
