import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import HourlyWageCalculator from "@/components/calculators/HourlyWageCalculator";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "시급 계산기",
  description: "월급과 주 근로시간을 입력하면 주휴시간을 반영한 환산 시급과 주급을 계산합니다.",
  alternates: { canonical: "/calculators/hourly-wage" },
};

const faqItems = [
  {
    question: "월급을 시급으로 환산할 때 왜 209시간을 쓰나요?",
    answer: "주 40시간 근무 기준으로 주휴시간 8시간을 더한 주 48시간에 연평균 주수(4.345주)를 곱하면 약 209시간이 나옵니다.",
  },
  {
    question: "주 40시간 미만 근무자는 어떻게 계산하나요?",
    answer: "주 근로시간을 입력하면 그에 비례한 주휴시간을 자동으로 반영해 월 환산 근로시간을 계산합니다.",
  },
  {
    question: "포괄임금제인데 시급을 알 수 있나요?",
    answer: "포괄임금에 포함된 고정 연장근로수당 등을 제외한 기본급만 입력하면 소정근로에 대한 시급을 확인할 수 있습니다.",
  },
  {
    question: "최저임금과 비교하려면 어떻게 하나요?",
    answer: "이 계산기로 나온 시급을 최저임금 계산기에 입력하면 최저임금 충족 여부를 바로 확인할 수 있습니다.",
  },
  {
    question: "2026년 기준인가요?",
    answer: "네. 계산 방식 자체는 연도와 무관하지만 예시값은 2026년 최저임금 기준으로 표시됩니다.",
  },
];

export default function HourlyWagePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "시급 계산기" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">시급 계산기</h1>
      <p className="mt-2 text-base text-muted">월급과 근로시간을 입력하면 시급으로 환산합니다.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <HourlyWageCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">시급 환산 방법</h2>
          <p className="text-sm leading-relaxed text-muted">
            월급을 시급으로 바꾸려면 주휴시간을 포함한 월 환산 근로시간으로 나눠야 합니다. 단순히
            월급을 근무일수와 시간으로만 나누면 주휴수당이 빠져 실제보다 낮은 시급이 나옵니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="hourly-wage" />
      </div>
    </div>
  );
}
