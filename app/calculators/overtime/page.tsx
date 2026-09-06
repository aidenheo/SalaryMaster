import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import OvertimeCalculator from "@/components/calculators/OvertimeCalculator";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "연장·야간·휴일수당 계산기",
  description: "시급과 연장·야간·휴일근로시간을 입력하면 가산수당을 포함한 예상 수당을 계산합니다.",
  alternates: { canonical: "/calculators/overtime" },
};

const faqItems = [
  {
    question: "연장근로수당은 왜 1.5배인가요?",
    answer: "근로기준법 제56조에 따라 법정근로시간을 초과한 연장근로는 통상임금의 50%를 가산해 지급해야 합니다.",
  },
  {
    question: "야간근로는 몇 시부터 몇 시까지인가요?",
    answer: "오후 10시부터 다음날 오전 6시까지입니다. 이 시간에 근무하면 50% 가산수당이 추가됩니다.",
  },
  {
    question: "연장근로이면서 야간근로이면 가산이 중복되나요?",
    answer: "네. 연장근로와 야간근로가 겹치는 시간은 두 가산이 각각 적용되어 합산됩니다.",
  },
  {
    question: "휴일근로 8시간을 넘으면 어떻게 되나요?",
    answer: "휴일근로 8시간까지는 50%, 8시간을 초과하는 시간은 100% 가산됩니다.",
  },
  {
    question: "5인 미만 사업장도 가산수당을 받을 수 있나요?",
    answer: "상시근로자 5인 미만 사업장은 연장·야간·휴일근로 가산수당 조항이 적용되지 않을 수 있습니다. 사업장 규모를 먼저 확인하세요.",
  },
];

export default function OvertimePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb baseUrl={siteUrl} items={[{ label: "홈", href: "/" }, { label: "연장·야간·휴일수당 계산기" }]} />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">연장·야간·휴일수당 계산기</h1>
      <p className="mt-2 text-base text-muted">근로시간 조건을 입력하면 가산수당을 계산합니다.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <OvertimeCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">가산수당 적용 기준</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>연장근로: 통상임금의 50% 가산</li>
            <li>야간근로(22:00~06:00): 통상임금의 50% 가산</li>
            <li>휴일근로 8시간 이내: 통상임금의 50% 가산</li>
            <li>휴일근로 8시간 초과: 통상임금의 100% 가산</li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            상시근로자 5인 미만 사업장은 이 가산 규정이 적용되지 않을 수 있습니다.
          </p>
        </section>
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="overtime" />
      </div>
    </div>
  );
}
