import { laborRules2026 } from "@/lib/rules/2026/labor";

/**
 * 월급을 시급으로 환산.
 * 월 소정근로시간 = (주 근로시간 + 주휴시간) × (365일 ÷ 7 ÷ 12)개월평균 주수
 * 주 40시간 근무(주휴 8시간 포함 48시간) 기준으로는 약 208.6시간이 나오며,
 * 실무에서 흔히 쓰는 고정값 209시간은 이를 반올림한 관행값이다.
 */
const AVERAGE_WEEKS_PER_MONTH = 365 / 7 / 12;

export interface HourlyWageInput {
  monthlySalary: number;
  weeklyWorkHours: number;
}

export interface HourlyWageResult {
  weeklyHolidayHours: number;
  monthlyWorkHours: number;
  hourlyWage: number;
  weeklyPay: number;
}

export function calculateHourlyWage(input: HourlyWageInput): HourlyWageResult {
  const { monthlySalary, weeklyWorkHours } = input;
  const eligible = weeklyWorkHours >= laborRules2026.weeklyHolidayMinHours;
  const cappedHours = Math.min(weeklyWorkHours, laborRules2026.standardWeeklyHours);
  const weeklyHolidayHours = eligible ? (cappedHours / laborRules2026.standardWeeklyHours) * 8 : 0;

  const monthlyWorkHours = (weeklyWorkHours + weeklyHolidayHours) * AVERAGE_WEEKS_PER_MONTH;
  const hourlyWage = monthlyWorkHours > 0 ? Math.round(monthlySalary / monthlyWorkHours) : 0;
  const weeklyPay = Math.round(hourlyWage * (weeklyWorkHours + weeklyHolidayHours));

  return { weeklyHolidayHours, monthlyWorkHours, hourlyWage, weeklyPay };
}
