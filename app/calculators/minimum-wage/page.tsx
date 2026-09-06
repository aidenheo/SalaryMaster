import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import RelatedCalculators from "@/components/RelatedCalculators";
import SourceList from "@/components/SourceList";
import MinimumWageCalculator from "@/components/calculators/MinimumWageCalculator";

const siteUrl = "https://salary-cal.com";

export const metadata: Metadata = {
  title: "최저임금 계산기 (2026년)",
  description:
    "시급·일급·주급·월급과 근무시간을 입력하면 2026년 최저임금(시급 10,320원) 충족 여부를 확인합니다. 월급은 주휴시간을 반영해 시급으로 환산해 비교합니다.",
  alternates: { canonical: "/calculators/minimum-wage" },
};

const faqItems = [
  {
    question: "2026년 최저임금은 얼마인가요?",
    answer:
      "시간급 10,320원입니다. 2025년(10,030원)보다 290원, 2.9% 올랐습니다. 주 40시간 근무 기준 월 환산액은 2,156,880원(월 209시간)이며, 2026년 1월 1일부터 12월 31일까지 업종 구분 없이 모든 사업장에 적용됩니다.",
  },
  {
    question: "월급을 받는데 최저임금 위반인지 어떻게 확인하나요?",
    answer:
      "월 급여를 시급으로 환산해 최저시급과 비교합니다. 환산 시 나누는 시간은 소정근로시간에 주휴시간을 더한 값입니다. 주 40시간 근무자는 209시간으로 나누며, 근무시간이 다르면 그에 맞춰 계산합니다. 이 계산기에 급여 형태를 '월급'으로 두고 근무시간을 입력하면 환산 시급을 바로 보여줍니다.",
  },
  {
    question: "식대나 상여금도 최저임금에 포함해서 계산하나요?",
    answer:
      "2024년부터 매월 정기적으로 지급되는 상여금과 식대·교통비 등 복리후생비는 전액 최저임금에 산입됩니다. 다만 연장·휴일근로에 대한 임금, 연장·야간·휴일근로 가산수당, 연차 미사용수당, 1년에 한 번 지급하는 상여금, 주휴일 외 유급휴일 임금 등은 산입되지 않습니다(최저임금법 시행규칙 별표1). 여기서 '연장·휴일근로에 대한 임금'은 가산수당뿐 아니라 그 시간에 대한 기본 임금까지 포함합니다. 월급을 입력할 때는 이런 항목을 뺀 산입 임금만 더해 입력하세요.",
  },
  {
    question: "수습기간에는 최저임금보다 적게 받아도 되나요?",
    answer:
      "1년 이상의 근로계약을 맺은 근로자는 수습 시작일부터 3개월 이내에 한해 최저임금의 90%(2026년 기준 9,288원)까지 감액할 수 있습니다. 단순노무직종(고용노동부 고시)은 수습이라도 감액이 적용되지 않습니다.",
  },
  {
    question: "주휴수당을 받으면 최저임금은 충족한 건가요?",
    answer:
      "별개의 문제입니다. 최저임금은 시간당 임금 수준을, 주휴수당은 1주 개근 시 유급휴일 임금을 다룹니다. 주휴수당을 받더라도 시급 환산액이 최저시급보다 낮으면 최저임금 위반입니다. 반대로 주 15시간 미만이면 주휴수당은 발생하지 않지만 최저임금은 그대로 적용됩니다.",
  },
  {
    question: "최저임금보다 적게 받고 있으면 어떻게 하나요?",
    answer:
      "먼저 임금 구성 항목 중 최저임금에 산입되는 금액을 정확히 확인하세요. 위반이 확인되면 고용노동부 고객상담센터(국번 없이 1350)나 관할 지방고용노동청에 진정·신고할 수 있습니다. 최저임금에 미달하는 근로계약은 그 부분에 한해 무효이며, 미달액은 소급해 청구할 수 있습니다.",
  },
];

export default function MinimumWagePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        baseUrl={siteUrl}
        items={[{ label: "홈", href: "/" }, { label: "최저임금 계산기" }]}
      />
      <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">최저임금 계산기</h1>
      <p className="mt-2 text-base text-muted">
        시급·일급·주급·월급과 근무 조건을 입력하면 2026년 최저임금 충족 여부를 확인합니다.
      </p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <MinimumWageCalculator />
      </div>

      <article className="mt-10 space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">이 계산기는 무엇을 계산하나요?</h2>
          <p className="text-sm leading-relaxed text-muted">
            받고 있는 임금이 2026년 최저임금 기준에 맞는지 확인하는 계산기입니다. 최저임금은
            시간당 금액(2026년 10,320원)으로 고시되기 때문에, 일급·주급·월급을 받는 경우에는
            그 임금을 시간당 금액으로 환산한 뒤 비교해야 합니다.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            특히 월급제는 단순히 월급을 실제 근무일수로 나누는 것이 아니라, 소정근로시간에
            유급으로 처리되는 주휴시간을 더한 시간으로 나눕니다. 주 40시간 근무자의 월
            환산시간이 209시간인 이유가 여기에 있습니다. 이 계산기는 입력한 근무 조건에 맞는
            환산시간을 계산해 시급을 구하고, 최저시급과 비교해 차액과 충족 여부를 보여줍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">입력값 설명</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>
              <strong className="text-foreground">급여 형태</strong> — 시급·일급·주급·월급 중
              실제 임금을 정한 단위를 선택합니다. 선택에 따라 필요한 입력값만 표시됩니다.
            </li>
            <li>
              <strong className="text-foreground">임금액</strong> — 해당 형태의 세전 임금.
              기본급에 매월 정기 지급되는 상여금·식대 등 최저임금에 산입되는 항목을 더하고,
              연장·휴일근로에 대한 임금, 연장·야간·휴일근로 가산수당, 연차 미사용수당 등
              산입되지 않는 항목은 빼고 입력합니다.
            </li>
            <li>
              <strong className="text-foreground">1일 소정근로시간</strong> — 근로계약에서
              일하기로 정한 하루 근로시간(휴게시간 제외). 소정근로시간은 1일 8시간을 넘을 수
              없으며, 8시간을 넘는 근로는 연장근로로 보아 최저임금 비교에서는 제외합니다.
              일급으로 확인할 때는 연장근로에 대한 임금을 뺀 금액을 입력해야 합니다.
            </li>
            <li>
              <strong className="text-foreground">주 소정근로일수</strong> — 1주에 일하기로
              정한 날의 수. 1일 근로시간과 곱해 주 소정근로시간을 구하며, 주 40시간을 초과하는
              부분은 연장근로로 보아 제외합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 방법</h2>
          <p className="text-sm leading-relaxed text-muted">
            환산 시급을 구한 뒤 2026년 최저시급 10,320원과 비교합니다.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>시급제: 입력한 시급을 그대로 비교합니다.</li>
            <li>일급제: 일급 ÷ 1일 소정근로시간(최대 8시간)</li>
            <li>주급제: 주급 ÷ (주 소정근로시간 + 주휴시간)</li>
            <li>월급제: 월 임금 ÷ (월 소정근로시간 + 월 주휴시간)</li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            주휴시간은 <span className="whitespace-nowrap">8시간 × (주 소정근로시간 ÷ 40)</span>으로
            계산하며, 주 소정근로시간이 15시간 미만이면 주휴시간은 발생하지 않습니다. 월
            환산시간은 주 단위 시간에 월 평균 주 수(약 4.345주)를 곱해 구합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">계산 예시</h2>
          <div className="space-y-3 text-sm leading-relaxed text-muted">
            <p>
              <strong className="text-foreground">시급 10,000원</strong> — 최저시급 10,320원보다
              시간당 320원 부족합니다. 최저임금 미달입니다.
            </p>
            <p>
              <strong className="text-foreground">
                월급 2,100,000원, 주 5일·1일 8시간 근무
              </strong>{" "}
              — 월 환산시간 209시간으로 나누면 약 10,048원입니다. 최저시급보다 시간당 약 272원
              부족해 미달입니다.
            </p>
            <p>
              <strong className="text-foreground">
                월급 2,200,000원, 주 5일·1일 8시간 근무
              </strong>{" "}
              — 209시간으로 나누면 약 10,526원으로, 최저시급을 시간당 약 206원 웃돕니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">
            계산 결과가 실제 판단과 다를 수 있는 이유
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>
              임금 항목마다 최저임금 산입 여부가 다릅니다. 상여금·복리후생비의 지급 주기,
              연장·휴일근로에 대한 임금(기본 임금과 가산수당 모두)과 연차 미사용수당의
              구분이 정확하지 않으면 환산 결과가 달라집니다.
            </li>
            <li>
              소정근로시간을 근로계약서와 다르게 입력하면 월 환산시간이 달라집니다. 포괄임금제
              계약은 계약서에 적힌 소정근로시간을 확인해야 합니다.
            </li>
            <li>
              수습 감액, 단시간·초단시간 근로, 감시·단속적 근로 등은 별도 기준이 적용될 수
              있습니다.
            </li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            이 계산기의 결과는 입력한 조건에 따른 예상값이며, 정확한 판단은 근로계약과 개별
            임금 항목의 성격에 따라 달라질 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-heading">2026년 기준</h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>최저시급: 10,320원 (2026.1.1 ~ 2026.12.31 적용)</li>
            <li>최저 월 환산액: 2,156,880원 (주 40시간, 월 209시간 기준)</li>
            <li>수습 감액 하한(1년 이상 계약·3개월 이내): 9,288원</li>
            <li>주휴수당 발생 요건: 1주 소정근로시간 15시간 이상 + 소정근로일 개근</li>
          </ul>
        </section>

        <SourceList
          items={[
            { label: "고용노동부 — 2026년 적용 최저임금 고시", href: "https://www.moel.go.kr/" },
            { label: "최저임금위원회", href: "https://www.minimumwage.go.kr/" },
            {
              label: "국가법령정보센터 — 최저임금법 제5조·제6조, 근로기준법 제55조",
              href: "https://www.law.go.kr/",
            },
          ]}
        />
      </article>

      <div className="mt-10 space-y-10">
        <Faq items={faqItems} />
        <RelatedCalculators slug="minimum-wage" />
      </div>
    </div>
  );
}
