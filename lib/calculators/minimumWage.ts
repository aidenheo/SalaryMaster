import { getMinimumWage } from "@/lib/rules/2026/minimumWage";
import { laborRules2026 } from "@/lib/rules/2026/labor";

/**
 * 최저임금 충족 여부 판단.
 *
 * 급여 형태(시급/일급/주급/월급)에 관계없이 입력 임금을 "시급"으로 환산한 뒤
 * 해당 연도 최저시급과 비교한다.
 * - 일급  : 일급 ÷ 1일 소정근로시간(법정 상한 8시간)
 * - 주급  : 주급 ÷ (주 소정근로시간 + 주휴시간)
 * - 월급  : 월 임금 ÷ (월 소정근로시간 + 월 주휴시간)
 *
 * 소정근로시간은 1일 8시간·주 40시간을 넘을 수 없으며(초과분은 연장근로로 최저임금
 * 비교 대상에서 제외), 주휴시간은 주 소정근로시간에 비례해 최대 8시간까지 인정한다.
 * (고용노동부 행정해석: 주휴시간 = 8 × 1주 소정근로시간 ÷ 40)
 *
 * 출처: 고용노동부 2026년 적용 최저임금 고시, 최저임금법 제5조·시행령 제5조,
 *       근로기준법 제55조.
 */

// 월 평균 주 수: 365일 ÷ 7일 ÷ 12개월 ≈ 4.345주.
// (주 40시간 + 주휴 8시간) × 4.345 ≈ 208.6 → 실무상 209시간으로 반올림한다.
const WEEKS_PER_MONTH = 365 / 7 / 12;

export type MinimumWagePayType = "hourly" | "daily" | "weekly" | "monthly";

export interface MinimumWageCheckInput {
  /** 급여 형태. 생략하면 시급으로 간주한다. */
  payType?: MinimumWagePayType;
  /** 급여 형태에 해당하는 임금액(최저임금 산입 대상 임금 기준). */
  pay?: number;
  /** 시급 입력 별칭. payType이 없거나 hourly일 때 pay 대신 사용할 수 있다. */
  hourlyWage?: number;
  /** 1일 소정근로시간(일급·주급·월급 계산에 사용). */
  hoursPerDay?: number;
  /** 주 소정근로일수(주급·월급 계산에 사용). */
  daysPerWeek?: number;
  year?: number;
}

export interface MinimumWageCheckResult {
  year: number;
  effectiveFrom: string;
  effectiveTo: string;
  minimumHourly: number;
  minimumMonthly: number;
  standardMonthlyHours: number;

  /** 1일 8시간·주 40시간 상한을 반영한 주 소정근로시간. */
  contractedWeeklyHours: number;
  /** 비례 계산한 주휴시간(주 15시간 미만이면 0). */
  weeklyHolidayHours: number;
  /** 월 환산 근로시간(주휴 포함). 월급 형태에서 의미가 있다. */
  monthlyHours: number;

  /** 입력 임금을 시급으로 환산한 값. */
  hourlyEquivalent: number;
  /** 입력 임금을 주 40시간·월 209시간 기준으로 환산한 월 임금. */
  monthlyEquivalent: number;

  /** 환산 시급 − 최저시급 (부호 유지, 미달이면 음수). */
  differencePerHour: number;
  /** 최저임금 이상이면 true. */
  meetsMinimum: boolean;
  /** 판단에 필요한 입력이 채워졌는지 여부. */
  hasEnoughInput: boolean;

  // --- 구버전 호환 필드 ---
  /** @deprecated meetsMinimum 사용 */
  isAboveMinimum: boolean;
  /** @deprecated 미달분(미달이 아니면 0) */
  shortfallPerHour: number;
}

function proratedWeeklyHolidayHours(weeklyHours: number): number {
  if (weeklyHours < laborRules2026.weeklyHolidayMinHours) return 0;
  const capped = Math.min(weeklyHours, laborRules2026.standardWeeklyHours);
  return (capped / laborRules2026.standardWeeklyHours) * 8;
}

export function checkMinimumWage(input: MinimumWageCheckInput): MinimumWageCheckResult {
  const rule = getMinimumWage(input.year ?? 2026);
  const payType = input.payType ?? "hourly";
  const pay = Math.max(0, input.pay ?? input.hourlyWage ?? 0);
  const hoursPerDay = Math.max(0, input.hoursPerDay ?? 0);
  const daysPerWeek = Math.max(0, input.daysPerWeek ?? 0);

  // 소정근로시간은 1일 8시간·주 40시간 상한을 넘지 못한다(초과분은 연장근로).
  const effectiveHoursPerDay = Math.min(hoursPerDay, 8);
  const contractedWeeklyHours = Math.min(
    effectiveHoursPerDay * daysPerWeek,
    laborRules2026.standardWeeklyHours
  );
  const weeklyHolidayHours = proratedWeeklyHolidayHours(contractedWeeklyHours);
  const monthlyHours = Math.round((contractedWeeklyHours + weeklyHolidayHours) * WEEKS_PER_MONTH);

  let hourlyEquivalent = 0;
  let hasEnoughInput = false;

  switch (payType) {
    case "hourly":
      hourlyEquivalent = pay;
      hasEnoughInput = pay > 0;
      break;
    case "daily":
      hasEnoughInput = pay > 0 && effectiveHoursPerDay > 0;
      hourlyEquivalent = hasEnoughInput ? pay / effectiveHoursPerDay : 0;
      break;
    case "weekly": {
      const divisor = contractedWeeklyHours + weeklyHolidayHours;
      hasEnoughInput = pay > 0 && divisor > 0;
      hourlyEquivalent = hasEnoughInput ? pay / divisor : 0;
      break;
    }
    case "monthly":
      hasEnoughInput = pay > 0 && monthlyHours > 0;
      hourlyEquivalent = hasEnoughInput ? pay / monthlyHours : 0;
      break;
  }

  const roundedHourly = Math.round(hourlyEquivalent);
  const differencePerHour = roundedHourly - rule.hourly;
  const meetsMinimum = hasEnoughInput && roundedHourly >= rule.hourly;

  return {
    year: Number(rule.effectiveFrom.slice(0, 4)),
    effectiveFrom: rule.effectiveFrom,
    effectiveTo: rule.effectiveTo,
    minimumHourly: rule.hourly,
    minimumMonthly: rule.monthly,
    standardMonthlyHours: rule.monthlyHours,

    contractedWeeklyHours,
    weeklyHolidayHours,
    monthlyHours,

    hourlyEquivalent,
    monthlyEquivalent: Math.round(hourlyEquivalent * rule.monthlyHours),

    differencePerHour,
    meetsMinimum,
    hasEnoughInput,

    isAboveMinimum: meetsMinimum,
    shortfallPerHour: meetsMinimum ? 0 : Math.max(0, rule.hourly - roundedHourly),
  };
}
