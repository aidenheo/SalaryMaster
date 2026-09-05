import { describe, it, expect } from "vitest";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weeklyHolidayPay";

describe("calculateWeeklyHolidayPay", () => {
  it("주 15시간 미만이면 주휴수당 대상이 아니다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_320, daysPerWeek: 2, hoursPerDay: 7 });
    expect(result.weeklyWorkHours).toBe(14);
    expect(result.eligible).toBe(false);
    expect(result.weeklyHolidayPay).toBe(0);
  });

  it("주 15시간 경계값(정확히 15시간)은 주휴수당 대상이다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_000, daysPerWeek: 3, hoursPerDay: 5 });
    expect(result.weeklyWorkHours).toBe(15);
    expect(result.eligible).toBe(true);
    expect(result.weeklyHolidayHours).toBeCloseTo(3, 5);
  });

  it("주 40시간(주 5일 8시간) 근무 시 주휴시간은 8시간이다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_320, daysPerWeek: 5, hoursPerDay: 8 });
    expect(result.weeklyHolidayHours).toBe(8);
    expect(result.weeklyHolidayPay).toBe(Math.round(8 * 10_320));
  });

  it("주 40시간을 초과해도 주휴시간은 8시간을 넘지 않는다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_000, daysPerWeek: 6, hoursPerDay: 8 });
    expect(result.weeklyHolidayHours).toBe(8);
  });

  it("근무시간이 0이면 주휴수당도 0이다", () => {
    const result = calculateWeeklyHolidayPay({ hourlyWage: 10_000, daysPerWeek: 0, hoursPerDay: 0 });
    expect(result.eligible).toBe(false);
    expect(result.weeklyHolidayPay).toBe(0);
  });
});
