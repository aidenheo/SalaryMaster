import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import SourceList from "@/components/SourceList";
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
            연봉제라도 매달 받는 급여는 결국 연봉을 12로 나눈 금액을 기준으로 4대보험과 세금이
            공제됩니다. 이 계산기는 월급 실수령액 계산기와 같은 계산 로직을 사용해 월 실수령액을
            구한 뒤 12배 해 연간 실수령액을 보여줍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">입력값 설명</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>
              <strong className="text-foreground">연봉(세전)</strong> — 근로계약서에 적힌 세전
              총 연봉. 고정 상여금이 연봉에 포함되어 있다면 함께 입력합니다.
            </li>
            <li>
              <strong className="text-foreground">월 비과세 급여</strong> — 식대(월 20만원
              한도) 등 매달 비과세로 처리되는 금액.
            </li>
            <li>
              <strong className="text-foreground">부양가족 수·자녀 수</strong> — 인적공제와
              자녀세액공제 계산에 쓰입니다. 본인을 포함해 실제로 공제받는 인원을 입력합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 예시</h2>
          <p className="text-sm leading-relaxed text-muted">
            연봉 42,000,000원이면 월 세전 급여는 3,500,000원입니다. 비과세 식대 20만원, 부양가족
            본인 1명 조건에서 월 실수령액은 약 300만원 내외, 연간 실수령액은 약 3,600만원
            내외로 계산됩니다. 상여금이 특정 월에 몰려 지급되면 월별 수령액은 달라지지만 연간
            합계는 비슷합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">결과가 실제와 다를 수 있는 이유</h2>
          <p className="text-sm leading-relaxed text-muted">
            상여금 지급 시기, 성과급 유무, 연중 요율·부양가족 변동, 연말정산 환급·추가납부에
            따라 실제 수령액은 달라집니다. 이 계산기는 조건이 1년 내내 동일하다고 가정한
            평균적인 예상값입니다.
          </p>
        </section>

        <SourceList
          items={[
            { label: "국민연금공단", href: "https://www.nps.or.kr/" },
            { label: "국민건강보험공단 — 4대 사회보험료 모의계산", href: "https://www.nhis.or.kr/" },
            { label: "국세청 홈택스 — 근로소득 간이세액표", href: "https://www.hometax.go.kr/" },
          ]}
        />
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="annual-salary" />
      </div>
    </div>
  );
}
