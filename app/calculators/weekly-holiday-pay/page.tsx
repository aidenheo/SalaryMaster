import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import SourceList from "@/components/SourceList";
import WeeklyHolidayPayCalculator from "@/components/calculators/WeeklyHolidayPayCalculator";

const siteUrl = "https://salary-cal.com";

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
          <h2 className="mb-2 text-xl font-bold text-heading">주휴수당을 받을 수 있는 조건</h2>
          <p className="text-sm leading-relaxed text-muted">
            세 가지 조건을 모두 만족해야 합니다. ① 1주 소정근로시간이 15시간 이상, ② 근로계약서에
            정한 그 주의 소정근로일을 모두 개근, ③ 다음 주에도 근로가 예정되어 있을 것. 정규직,
            계약직, 아르바이트 등 고용 형태는 상관없습니다. 실제 일한 시간이 아니라 일하기로
            <span className="whitespace-nowrap"> 정한</span> 시간(소정근로시간)으로 15시간 여부를
            판단합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">입력값 설명</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>
              <strong className="text-foreground">시급</strong> — 주휴수당 산정 기준이 되는
              시간당 임금.
            </li>
            <li>
              <strong className="text-foreground">주 근무일수·1일 근무시간</strong> — 근로계약에서
              정한 소정근로일수와 하루 근로시간. 두 값을 곱해 주 소정근로시간을 구합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 방법</h2>
          <p className="text-sm leading-relaxed text-muted">
            주휴시간 = 8시간 × (주 소정근로시간 ÷ 40)이며 최대 8시간을 넘지 않습니다. 주휴수당은
            주휴시간에 시급을 곱한 금액입니다. 예를 들어 주 40시간 근무자는 8시간분(시급 × 8),
            주 20시간 근무자는 4시간분이 주휴수당입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 예시</h2>
          <div className="space-y-2 text-sm leading-relaxed text-muted">
            <p>
              시급 12,000원, 주 5일·1일 6시간(주 30시간) 근무 → 주휴시간 6시간 → 주휴수당
              72,000원.
            </p>
            <p>
              시급 12,000원, 주 2일·1일 6시간(주 12시간) 근무 → 15시간 미만이라 주휴수당은
              발생하지 않습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">결과가 실제와 다를 수 있는 이유</h2>
          <p className="text-sm leading-relaxed text-muted">
            지각·조퇴는 결근이 아니므로 개근으로 인정되지만, 무단결근이 있으면 그 주의 주휴수당은
            발생하지 않습니다. 주마다 근무시간이 다른 경우, 4주를 평균해 15시간 이상인지
            판단합니다. 5인 미만 사업장도 주휴수당은 적용됩니다.
          </p>
        </section>

        <SourceList
          items={[
            {
              label: "국가법령정보센터 — 근로기준법 제55조, 시행령 제30조",
              href: "https://www.law.go.kr/",
            },
            { label: "고용노동부 — 주휴수당 관련 안내", href: "https://www.moel.go.kr/" },
          ]}
        />
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="weekly-holiday-pay" />
      </div>
    </div>
  );
}
