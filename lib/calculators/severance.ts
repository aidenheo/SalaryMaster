/**
 * 퇴직금 계산 (근로자퇴직급여보장법 §8).
 * 퇴직금 = 1일 평균임금 × 30일 × (계속근로일수 / 365)
 * 평균임금 = 퇴직일 이전 3개월간 지급된 임금총액 / 그 3개월간의 총 일수
 * (상여금·미사용연차수당은 연간 지급액의 3/12을 3개월분 임금에 가산)
 */
export interface SeveranceInput {
  hireDate: string; // YYYY-MM-DD
  resignDate: string; // YYYY-MM-DD
  last3MonthsTotalWage: number;
  annualBonusTotal: number;
  annualLeaveAllowance: number;
}

export interface SeveranceResult {
  continuousServiceDays: number;
  continuousServiceYears: number;
  averageWageBaseDays: number;
  averageDailyWage: number;
  expectedSeverancePay: number;
  eligible: boolean;
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function calculateSeverance(input: SeveranceInput): SeveranceResult {
  const hire = new Date(input.hireDate);
  const resign = new Date(input.resignDate);

  const continuousServiceDays = daysBetween(hire, resign);
  const continuousServiceYears = continuousServiceDays / 365;
  const eligible = continuousServiceDays >= 365;

  const threeMonthsBefore = new Date(resign);
  threeMonthsBefore.setMonth(threeMonthsBefore.getMonth() - 3);
  const averageWageBaseDays = Math.max(1, daysBetween(threeMonthsBefore, resign));

  const bonusPortion = input.annualBonusTotal * (3 / 12);
  const leavePortion = input.annualLeaveAllowance * (3 / 12);
  const totalWageForAverage = input.last3MonthsTotalWage + bonusPortion + leavePortion;

  const averageDailyWage = totalWageForAverage / averageWageBaseDays;
  const expectedSeverancePay = eligible ? Math.round(averageDailyWage * 30 * continuousServiceYears) : 0;

  return {
    continuousServiceDays,
    continuousServiceYears,
    averageWageBaseDays,
    averageDailyWage,
    expectedSeverancePay,
    eligible,
  };
}
