import { getMinimumWage } from "@/lib/rules/2026/minimumWage";

export interface MinimumWageCheckInput {
  hourlyWage: number;
  year?: number;
}

export interface MinimumWageCheckResult {
  minimumHourly: number;
  minimumMonthly: number;
  isAboveMinimum: boolean;
  shortfallPerHour: number;
}

export function checkMinimumWage(input: MinimumWageCheckInput): MinimumWageCheckResult {
  const rule = getMinimumWage(input.year ?? 2026);
  const isAboveMinimum = input.hourlyWage >= rule.hourly;
  return {
    minimumHourly: rule.hourly,
    minimumMonthly: rule.monthly,
    isAboveMinimum,
    shortfallPerHour: isAboveMinimum ? 0 : rule.hourly - input.hourlyWage,
  };
}
