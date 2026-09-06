import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import SourceList from "@/components/SourceList";
import AnnualLeavePayCalculator from "@/components/calculators/AnnualLeavePayCalculator";

const siteUrl = "https://salary-cal.com";

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
            정기적·일률적으로 지급하기로 정해진 기본급과 고정수당을 말합니다. 연차수당,
            연장근로수당 등 각종 법정수당 계산의 기준이 됩니다. 1일 통상임금은 월 통상임금을 월
            소정근로시간으로 나눈 뒤 1일 소정근로시간(보통 8시간)을 곱해 구합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">입력값 설명</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>
              <strong className="text-foreground">입사일·기준일</strong> — 기준일까지의
              근속기간으로 발생 연차일수를 계산합니다. 보통 연차 정산 시점이나 퇴사일을
              기준일로 둡니다.
            </li>
            <li>
              <strong className="text-foreground">이미 사용한 연차일수</strong> — 발생 연차에서
              빼서 잔여 연차를 구합니다.
            </li>
            <li>
              <strong className="text-foreground">월 통상임금·월 소정근로시간</strong> — 1일
              통상임금 계산에 쓰입니다. 주 40시간 근무라면 소정근로시간은 보통 209시간입니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 예시</h2>
          <p className="text-sm leading-relaxed text-muted">
            근속 1년(발생 연차 15일) 중 5일을 사용해 잔여 연차가 10일이고, 월 통상임금
            2,700,000원, 월 소정근로시간 209시간이라면 1일 통상임금은 약 103,300원, 예상
            연차수당은 약 103만원입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">연차 사용촉진과 결과 차이</h2>
          <p className="text-sm leading-relaxed text-muted">
            회사가 근로기준법 제61조에 따라 적법하게 연차 사용을 촉진했는데도 근로자가
            사용하지 않았다면 미사용 연차수당 지급 의무가 없을 수 있습니다. 또 회계연도 기준으로
            연차를 부여하는 회사가 많아 입사일 기준 계산과 실제 부여일수가 다를 수 있습니다.
            정확한 일수는 회사 취업규칙을 확인하세요.
          </p>
        </section>

        <SourceList
          items={[
            {
              label: "국가법령정보센터 — 근로기준법 제60조·제61조",
              href: "https://www.law.go.kr/",
            },
            { label: "고용노동부 — 연차유급휴가 안내", href: "https://www.moel.go.kr/" },
          ]}
        />
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="annual-leave-pay" />
      </div>
    </div>
  );
}
