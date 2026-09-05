import { laborRules2026 } from "@/lib/rules/2026/labor";

export interface WeeklyHolidayPayInput {
  hourlyWage: number;
  daysPerWeek: number;
  hoursPerDay: number;
}

export interface WeeklyHolidayPayResult {
  weeklyWorkHours: number;
  eligible: boolean;
  weeklyHolidayHours: number;
  weeklyHolidayPay: number;
  weeklyBasePay: number;
  expectedWeeklyPay: number;
}

export function calculateWeeklyHolidayPay(input: WeeklyHolidayPayInput): WeeklyHolidayPayResult {
  const { hourlyWage, daysPerWeek, hoursPerDay } = input;
  const weeklyWorkHours = daysPerWeek * hoursPerDay;
  const eligible = weeklyWorkHours >= laborRules2026.weeklyHolidayMinHours;

  const cappedHours = Math.min(weeklyWorkHours, laborRules2026.standardWeeklyHours);
  const weeklyHolidayHours = eligible ? (cappedHours / laborRules2026.standardWeeklyHours) * 8 : 0;
  const weeklyHolidayPay = Math.round(weeklyHolidayHours * hourlyWage);
  const weeklyBasePay = Math.round(weeklyWorkHours * hourlyWage);

  return {
    weeklyWorkHours,
    eligible,
    weeklyHolidayHours,
    weeklyHolidayPay,
    weeklyBasePay,
    expectedWeeklyPay: weeklyBasePay + weeklyHolidayPay,
  };
}
