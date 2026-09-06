import Link from "next/link";
import { calculators } from "@/lib/calculatorList";
import Faq from "@/components/Faq";
import AdSlot from "@/components/ads/AdSlot";

const groups = ["급여 계산", "수당 계산", "퇴직·연차", "최저임금"] as const;

const popularSlugs = ["salary", "annual-salary", "severance", "weekly-holiday-pay"];

const homeFaq = [
  {
    question: "이 사이트의 계산 결과는 실제 급여명세서와 똑같나요?",
    answer:
      "아닙니다. 회사마다 수당 항목, 비과세 처리 방식, 공제 시점이 다를 수 있어 실제 급여명세서와 차이가 날 수 있습니다. 이 계산기는 2026년 기준 공식 요율과 세법을 바탕으로 한 예상값을 보여줍니다.",
  },
  {
    question: "회원가입이 필요한가요?",
    answer: "필요하지 않습니다. 모든 계산은 브라우저에서 즉시 처리되며 입력한 급여 정보는 서버로 전송되거나 저장되지 않습니다.",
  },
  {
    question: "2026년 기준이 아니면 어떻게 하나요?",
    answer: "각 계산기 결과 화면에 적용 연도와 출처를 표시합니다. 연도별 기준은 법령·요율이 바뀔 때마다 순차적으로 업데이트할 예정입니다.",
  },
  {
    question: "아르바이트생도 사용할 수 있나요?",
    answer: "네. 시급 계산기와 주휴수당 계산기는 아르바이트, 단시간 근로자도 사용할 수 있도록 만들었습니다.",
  },
  {
    question: "모바일에서도 사용할 수 있나요?",
    answer: "네. 모든 계산기는 모바일 화면에 맞춰 설계되어 있으며 숫자 입력 시 숫자 키패드가 표시됩니다.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10">
        <h1 className="text-2xl font-bold text-heading sm:text-3xl">직장인 급여 계산기</h1>
        <p className="mt-2 text-base leading-relaxed text-muted">
          월급·연봉 실수령액부터 주휴수당, 퇴직금, 연차수당, 최저임금까지 2026년 기준으로
          계산합니다. 입력한 값은 브라우저에서만 처리되며 저장되지 않습니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/calculators/salary"
            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            월급 실수령액 계산
          </Link>
          <Link
            href="/calculators/annual-salary"
            className="rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
          >
            연봉 실수령액 계산
          </Link>
        </div>
      </section>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group} aria-labelledby={`group-${group}`}>
            <h2 id={`group-${group}`} className="mb-3 text-lg font-bold text-heading">
              {group}
            </h2>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {calculators
                .filter((c) => c.group === group)
                .map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={`/calculators/${calc.slug}`}
                      className="block h-full rounded-md border border-border bg-surface px-3 py-3 hover:border-primary"
                    >
                      <p className="text-sm font-medium text-foreground">{calc.shortTitle}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{calc.description}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="my-10">
        <AdSlot />
      </section>

      <section className="mb-10" aria-labelledby="popular-heading">
        <h2 id="popular-heading" className="mb-3 text-lg font-bold text-heading">
          자주 찾는 계산기
        </h2>
        <ul className="flex flex-wrap gap-2">
          {popularSlugs.map((slug) => {
            const calc = calculators.find((c) => c.slug === slug);
            if (!calc) return null;
            return (
              <li key={slug}>
                <Link
                  href={`/calculators/${slug}`}
                  className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary"
                >
                  {calc.shortTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-10 space-y-6" aria-labelledby="about-heading">
        <div>
          <h2 id="about-heading" className="mb-2 text-lg font-bold text-heading">
            이 사이트를 쓰는 법
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            계산기마다 필요한 값(월급, 시급, 근무시간, 입사일 등)을 입력하면 결과가 바로
            갱신됩니다. 결과 화면에는 공제 항목이나 수당 내역이 함께 표시되며, 페이지 아래쪽에서
            계산 방법과 예시, 근거가 되는 공식 자료를 확인할 수 있습니다. 실수령액을 알고 싶은데
            연봉만 안다면 연봉 계산기, 월급만 안다면 월급 계산기를 사용하세요.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold text-heading">2026년 기준을 쓰는 이유</h2>
          <p className="text-sm leading-relaxed text-muted">
            4대보험료율과 세법, 최저임금은 해마다 바뀝니다. 이 사이트는 2026년 1월부터 적용되는
            최저임금(시급 10,320원), 국민연금 보험료율 인상(9.5%) 등 최신 기준을 반영합니다.
            4대보험료율은 국민연금공단·국민건강보험공단·고용노동부 고시를, 소득세는 소득세법상
            근로소득공제·인적공제·세율표를 따릅니다.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-bold text-heading">계산 결과의 한계</h2>
          <p className="text-sm leading-relaxed text-muted">
            결과는 입력 조건에 따른 예상값입니다. 회사마다 수당 구성과 비과세 처리, 공제 항목이
            다르고, 국세청 간이세액표와 이 사이트의 소득세 산정 방식에도 차이가 있어 실제
            급여명세서·고지서와 다를 수 있습니다. 법률·세무·노무 상담을 대신하지 않습니다.
          </p>
        </div>
      </section>

      <Faq items={homeFaq} />
    </div>
  );
}
