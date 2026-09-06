import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import SourceList from "@/components/SourceList";
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
          <h2 className="mb-2 text-xl font-bold text-heading">이 계산기는 무엇을 계산하나요?</h2>
          <p className="text-sm leading-relaxed text-muted">
            월급을 받는 근로자가 자신의 시간당 임금이 얼마인지 확인할 때 쓰는 계산기입니다.
            연장근로수당·주휴수당·퇴직금 등 각종 수당은 시급(통상시급)을 기준으로 계산되기
            때문에, 내 시급을 알아 두면 수당이 제대로 지급됐는지 점검할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">입력값 설명</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>
              <strong className="text-foreground">월급</strong> — 시급으로 환산할 월 임금.
              통상시급을 구하려면 기본급과 고정수당 등 통상임금에 해당하는 금액만 입력합니다.
            </li>
            <li>
              <strong className="text-foreground">주 근로시간</strong> — 주휴시간을 뺀 실제
              소정근로시간(주 40시간 근무라면 40).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 방법</h2>
          <p className="text-sm leading-relaxed text-muted">
            시급 = 월급 ÷ (월 소정근로시간 + 월 주휴시간)으로 계산합니다. 주휴시간은 주
            소정근로시간에 비례하며(주 40시간이면 8시간), 월 환산은 주 단위 시간에 월 평균 주
            수(약 4.345주)를 곱합니다. 월급을 실제 근무일수로만 나누면 유급으로 처리되는
            주휴시간이 빠져 시급이 실제보다 높게 나옵니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 예시</h2>
          <p className="text-sm leading-relaxed text-muted">
            월급 2,500,000원, 주 40시간 근무라면 월 환산 근로시간은 약 209시간이고 시급은 약
            11,990원입니다. 같은 월급이라도 주 근로시간이 35시간이면 월 환산시간이 줄어 시급은
            더 높게 계산됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">2026년 기준</h2>
          <p className="text-sm leading-relaxed text-muted">
            2026년 최저시급은 10,320원입니다. 환산 시급이 이보다 낮다면 최저임금 계산기에서
            근무 조건을 넣어 위반 여부를 확인해 보세요. 환산 방식 자체는 연도와 무관합니다.
          </p>
        </section>

        <SourceList
          items={[
            {
              label: "국가법령정보센터 — 근로기준법 제2조(통상임금), 시행령 제6조",
              href: "https://www.law.go.kr/",
            },
            { label: "고용노동부 — 통상임금 산정지침", href: "https://www.moel.go.kr/" },
          ]}
        />
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="hourly-wage" />
      </div>
    </div>
  );
}
