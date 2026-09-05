import { laborRules2026 } from "@/lib/rules/2026/labor";

/**
 * 연차휴가 발생 및 연차수당 계산 (근로기준법 §60).
 * - 입사 1년 미만: 매월 개근 시 1일, 최대 11일
 * - 입사 1년 이상: 15일 + (근속연수-1)/2 (내림), 최대 25일
 * 연차수당 = 잔여 연차일수 × 1일 통상임금
 */
export interface AnnualLeaveInput {
  hireDate: string; // YYYY-MM-DD
  asOfDate: string; // YYYY-MM-DD, 기준일(계산 시점)
  usedLeaveDays: number;
  monthlyOrdinaryWage: number;
  monthlyWorkHours: number;
}

export interface AnnualLeaveResult {
  continuousServiceYears: number;
  accruedLeaveDays: number;
  remainingLeaveDays: number;
  dailyOrdinaryWage: number;
  expectedLeaveAllowance: number;
}

function monthsBetween(from: Date, to: Date): number {
  return (
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth()) -
    (to.getDate() < from.getDate() ? 1 : 0)
  );
}

export function calculateAnnualLeave(input: AnnualLeaveInput): AnnualLeaveResult {
  const hire = new Date(input.hireDate);
  const asOf = new Date(input.asOfDate);

  const totalMonths = Math.max(0, monthsBetween(hire, asOf));
  const continuousServiceYears = Math.floor(totalMonths / 12);

  let accruedLeaveDays: number;
  if (continuousServiceYears < 1) {
    accruedLeaveDays = Math.min(totalMonths, laborRules2026.annualLeave.firstYearMaxDays);
  } else {
    accruedLeaveDays = Math.min(
      laborRules2026.annualLeave.baseYearlyDays + Math.floor((continuousServiceYears - 1) / 2),
      laborRules2026.annualLeave.maxDays
    );
  }

  const remainingLeaveDays = Math.max(0, accruedLeaveDays - input.usedLeaveDays);
  const hourlyOrdinaryWage = input.monthlyOrdinaryWage / Math.max(1, input.monthlyWorkHours);
  const dailyOrdinaryWage = Math.round(hourlyOrdinaryWage * 8);
  const expectedLeaveAllowance = Math.round(remainingLeaveDays * dailyOrdinaryWage);

  return {
    continuousServiceYears,
    accruedLeaveDays,
    remainingLeaveDays,
    dailyOrdinaryWage,
    expectedLeaveAllowance,
  };
}
