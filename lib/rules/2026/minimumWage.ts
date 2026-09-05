/**
 * 연도별 최저임금 데이터.
 * 출처: 고용노동부 최저임금 고시 (https://www.moel.go.kr)
 * 2026년 최저임금: 시간급 10,320원 (고용노동부 고시, 2026.1.1 ~ 2026.12.31 적용)
 * 월 환산액은 주 40시간 근무 + 주휴시간 8시간 포함 월 209시간 기준.
 */
export interface MinimumWageYear {
  hourly: number;
  monthlyHours: number;
  monthly: number;
  effectiveFrom: string;
  effectiveTo: string;
  source: string;
}

export const minimumWageByYear: Record<number, MinimumWageYear> = {
  2025: {
    hourly: 10030,
    monthlyHours: 209,
    monthly: 2096270,
    effectiveFrom: "2025-01-01",
    effectiveTo: "2025-12-31",
    source: "고용노동부 2025년 적용 최저임금 고시",
  },
  2026: {
    hourly: 10320,
    monthlyHours: 209,
    monthly: 2156880,
    effectiveFrom: "2026-01-01",
    effectiveTo: "2026-12-31",
    source: "고용노동부 2026년 적용 최저임금 고시 (2025년 8월 확정)",
  },
};

export const LATEST_MINIMUM_WAGE_YEAR = 2026;

export function getMinimumWage(year: number = LATEST_MINIMUM_WAGE_YEAR): MinimumWageYear {
  return minimumWageByYear[year] ?? minimumWageByYear[LATEST_MINIMUM_WAGE_YEAR];
}
