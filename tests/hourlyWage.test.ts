import { describe, it, expect } from "vitest";
import { calculateHourlyWage } from "@/lib/calculators/hourlyWage";

describe("calculateHourlyWage", () => {
  it("주 40시간(주휴 포함 월 209시간) 기준 월급 2,156,880원은 최저시급 10,320원과 근접하게 환산된다", () => {
    const result = calculateHourlyWage({ monthlySalary: 2_156_880, weeklyWorkHours: 40 });
    expect(result.hourlyWage).toBeGreaterThan(10_200);
    expect(result.hourlyWage).toBeLessThan(10_450);
  });

  it("주 15시간 미만 근무는 주휴시간이 반영되지 않는다", () => {
    const result = calculateHourlyWage({ monthlySalary: 500_000, weeklyWorkHours: 10 });
    expect(result.weeklyHolidayHours).toBe(0);
  });

  it("근로시간이 0이면 0으로 나누지 않고 시급을 0으로 반환한다", () => {
    const result = calculateHourlyWage({ monthlySalary: 0, weeklyWorkHours: 0 });
    expect(result.hourlyWage).toBe(0);
    expect(Number.isFinite(result.hourlyWage)).toBe(true);
  });
});
