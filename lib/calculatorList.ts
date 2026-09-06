export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  group: "급여 계산" | "수당 계산" | "퇴직·연차" | "최저임금";
}

export const calculators: CalculatorMeta[] = [
  {
    slug: "salary",
    title: "월급 실수령액 계산기",
    shortTitle: "월급 실수령액",
    description: "월급에서 4대보험과 세금을 뺀 예상 실수령액을 계산합니다.",
    group: "급여 계산",
  },
  {
    slug: "annual-salary",
    title: "연봉 실수령액 계산기",
    shortTitle: "연봉 실수령액",
    description: "연봉을 입력하면 월 실수령액과 연간 실수령액을 계산합니다.",
    group: "급여 계산",
  },
  {
    slug: "hourly-wage",
    title: "시급 계산기",
    shortTitle: "시급 계산",
    description: "월급을 시급으로 환산하고 주급을 계산합니다.",
    group: "급여 계산",
  },
  {
    slug: "weekly-holiday-pay",
    title: "주휴수당 계산기",
    shortTitle: "주휴수당",
    description: "시급과 근무일수, 근무시간으로 주휴수당을 계산합니다.",
    group: "수당 계산",
  },
  {
    slug: "overtime",
    title: "연장·야간·휴일수당 계산기",
    shortTitle: "연장·야간·휴일수당",
    description: "연장·야간·휴일근로시간을 입력해 가산수당을 계산합니다.",
    group: "수당 계산",
  },
  {
    slug: "severance",
    title: "퇴직금 계산기",
    shortTitle: "퇴직금",
    description: "입사일과 퇴사일, 평균임금으로 예상 퇴직금을 계산합니다.",
    group: "퇴직·연차",
  },
  {
    slug: "annual-leave-pay",
    title: "연차수당 계산기",
    shortTitle: "연차수당",
    description: "근속기간과 통상임금으로 잔여 연차수당을 계산합니다.",
    group: "퇴직·연차",
  },
  {
    slug: "minimum-wage",
    title: "최저임금 계산기",
    shortTitle: "최저임금 확인",
    description: "시급·일급·주급·월급과 근무시간으로 2026년 최저임금 충족 여부를 확인합니다.",
    group: "최저임금",
  },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getRelatedCalculators(slug: string, count = 4): CalculatorMeta[] {
  const current = getCalculator(slug);
  const others = calculators.filter((c) => c.slug !== slug);
  if (!current) return others.slice(0, count);
  const sameGroup = others.filter((c) => c.group === current.group);
  const rest = others.filter((c) => c.group !== current.group);
  return [...sameGroup, ...rest].slice(0, count);
}
