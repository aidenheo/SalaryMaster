/**
 * 근로소득세 계산 기준 데이터.
 *
 * 국세청이 매월 원천징수 시 실제로 사용하는 표는 "근로소득 간이세액표"이며
 * 월급여·공제대상가족수 조합별 세액이 표로 고시되어 있다(소득세법 시행령 별표 2).
 * 이 표 자체는 아래에 나열된 소득세법상 공제·세율 구조를 근거로 국세청이
 * 미리 계산해 둔 값으로, 개별 조합을 모두 재현하려면 방대한 표 데이터가 필요하다.
 *
 * 본 계산기는 간이세액표를 그대로 복제하는 대신, 그 표의 산정 근거인
 * 소득세법 조항(근로소득공제 §47, 인적공제 §50, 사회보험료 공제 §52,
 * 종합소득세율 §55, 근로소득세액공제 §59, 자녀세액공제 §59-1)을 사용해
 * "연간 예상세액 ÷ 12" 방식으로 월 소득세를 추정한다.
 * 따라서 실제 급여명세서의 원천징수세액(간이세액표 기준)과 차이가 날 수 있으며,
 * 이 사실을 결과 화면에 명확히 안내한다.
 *
 * 출처: 국세청 홈택스 "근로소득 원천징수방법(간이세액표)" 안내,
 *       소득세법 및 시행령(2024년 개정, 2026년 기준 유지).
 */

export interface TaxBracket {
  upTo: number | null;
  rate: number;
  deduction: number;
}

// 근로소득공제 (소득세법 §47) — 연간 총급여 기준 누진공제.
// 공제액 = 총급여 × rate + addend (구간 경계에서 값이 이어지도록 계산된 가산 상수)
export const earnedIncomeDeductionBrackets: TaxBracket[] = [
  { upTo: 5_000_000, rate: 0.7, deduction: 0 },
  { upTo: 15_000_000, rate: 0.4, deduction: 1_500_000 },
  { upTo: 45_000_000, rate: 0.15, deduction: 5_250_000 },
  { upTo: 100_000_000, rate: 0.05, deduction: 9_750_000 },
  { upTo: null, rate: 0.02, deduction: 12_750_000 },
];

// 종합소득세율표 (소득세법 §55, 2023년 개정 후 유지)
export const incomeTaxBrackets: TaxBracket[] = [
  { upTo: 14_000_000, rate: 0.06, deduction: 0 },
  { upTo: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { upTo: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { upTo: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { upTo: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { upTo: 500_000_000, rate: 0.4, deduction: 25_940_000 },
  { upTo: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { upTo: null, rate: 0.45, deduction: 65_940_000 },
];

export const incomeTaxRules2026 = {
  // 인적공제 1인당 (소득세법 §50)
  personalDeductionPerPerson: 1_500_000,
  // 근로소득세액공제 (소득세법 §59)
  earnedIncomeTaxCredit: {
    thresholdAmount: 1_300_000,
    rateBelowThreshold: 0.55,
    rateAboveThreshold: 0.3,
    // 총급여 구간별 공제 한도. reducePerWon이 있으면 wageFloor 초과분에 대해
    // cap에서 차감하되 floorCap 밑으로는 내려가지 않는다.
    capBands: [
      { wageUpTo: 33_000_000, wageFloor: 0, cap: 740_000, reducePerWon: 0, floorCap: 740_000 },
      { wageUpTo: 70_000_000, wageFloor: 33_000_000, cap: 740_000, reducePerWon: 0.008, floorCap: 660_000 },
      { wageUpTo: null, wageFloor: 70_000_000, cap: 660_000, reducePerWon: 0.5, floorCap: 500_000 },
    ],
  },
  // 자녀세액공제 (소득세법 §59-1, 8세 이상 기본공제대상 자녀·손자녀 기준)
  childTaxCredit: {
    oneChild: 150_000,
    twoChildren: 350_000,
    perAdditionalChild: 300_000,
  },
  localIncomeTaxRate: 0.1,
  source: "소득세법 §47, §50, §52, §55, §59, §59-1 (2026년 기준 유지)",
};

// 종합소득세율표 등 "과세표준 × rate - 누진공제" 형태의 감산식 브라켓용
export function calcProgressiveTax(base: number, brackets: TaxBracket[]): number {
  if (base <= 0) return 0;
  const bracket = brackets.find((b) => b.upTo === null || base <= b.upTo) ?? brackets[brackets.length - 1];
  return Math.max(0, base * bracket.rate - bracket.deduction);
}

// 근로소득공제 등 "총급여 × rate + 가산상수" 형태의 가산식 브라켓용
export function calcEarnedIncomeDeduction(annualWage: number): number {
  if (annualWage <= 0) return 0;
  const bracket =
    earnedIncomeDeductionBrackets.find((b) => b.upTo === null || annualWage <= b.upTo) ??
    earnedIncomeDeductionBrackets[earnedIncomeDeductionBrackets.length - 1];
  return annualWage * bracket.rate + bracket.deduction;
}

// 근로소득세액공제 한도 (총급여 구간별로 감소, incomeTaxRules2026.earnedIncomeTaxCredit.capBands 기준)
export function calcEarnedIncomeTaxCreditCap(annualTotalWage: number): number {
  const bands = incomeTaxRules2026.earnedIncomeTaxCredit.capBands;
  const band = bands.find((b) => b.wageUpTo === null || annualTotalWage <= b.wageUpTo) ?? bands[bands.length - 1];
  const reduced = band.cap - Math.max(0, annualTotalWage - band.wageFloor) * band.reducePerWon;
  return Math.max(band.floorCap, reduced);
}
