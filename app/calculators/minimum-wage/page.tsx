import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import MinimumWageCalculator from "@/components/calculators/MinimumWageCalculator";

const siteUrl = "https://salary-master.example.com";

export const metadata: Metadata = {
  title: "최저임금 계산기 (2026년)",
  description: "2026년 최저임금 시간급 10,320원 기준으로 내 시급이 최저임금을 충족하는지 확인합니다.",
  alternates: { canonical: "/calculators/minimum-wage" },
};

const faqItems = [
  {
    question: "2026년 최저임금은 얼마인가요?",
    answer: "시간급 10,320원입니다. 주 40시간 근무, 월 209시간 기준 월 환산액은 2,156,880원입니다.",
  },
  {
    question: "최저임금은 누구에게 적용되나요?",
    answer: "정규직, 계약직, 아르바이트, 수습사원 등 근로기준법상 근로자 대부분에게 적용됩니다. 일부 예외는 최저임금법에 따로 정해져 있습니다.",
  },
  {
    question: "수습기간에는 최저임금보다 적게 받아도 되나요?",
    answer: "1년 이상 계약한 근로자는 수습 시작 3개월 이내에 한해 최저임금의 90%까지 감액할 수 있습니다. 단순 노무직 등 일부 직종은 감액이 적용되지 않습니다.",
  },
  {
    question: "월급에 식대나 교통비도 포함해서 비교하나요?",
    answer: "최저임금 산입범위에 포함되는 임금인지에 따라 다릅니다. 정기적으로 지급되는 상여금과 복리후생비 일부는 최저임금 계산에 포함될 수 있습니다.",
  },
  {
    question: "최저임금보다 적게 받고 있으면 어떻게 해야 하나요?",
    answer: "고용노동부 고객센터(국번없이 1350)나 관할 고용노동청에 상담·신고할 수 있습니다.",
  },
];

export default function MinimumWagePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "최저임금 계산기" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">최저임금 계산기</h1>
      <p className="mt-2 text-base text-muted">2026년 최저임금 기준으로 내 시급을 확인합니다.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <MinimumWageCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">2026년 최저임금 기준</h2>
          <p className="text-sm leading-relaxed text-muted">
            2026년 적용 최저임금은 고용노동부 고시에 따라 시간급 10,320원입니다. 이 기준은
            2026년 1월 1일부터 12월 31일까지 적용됩니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="minimum-wage" />
      </div>
    </div>
  );
}
