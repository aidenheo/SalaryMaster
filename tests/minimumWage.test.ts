import { describe, it, expect } from "vitest";
import { checkMinimumWage } from "@/lib/calculators/minimumWage";
import { getMinimumWage, minimumWageByYear } from "@/lib/rules/2026/minimumWage";

describe("checkMinimumWage", () => {
  it("2026년 최저시급은 10,320원이다", () => {
    expect(getMinimumWage(2026).hourly).toBe(10_320);
  });

  it("최저시급과 정확히 같으면 미달이 아니다(경계값)", () => {
    const result = checkMinimumWage({ hourlyWage: 10_320 });
    expect(result.isAboveMinimum).toBe(true);
    expect(result.shortfallPerHour).toBe(0);
  });

  it("최저시급보다 1원 낮으면 미달로 판정하고 부족분을 계산한다", () => {
    const result = checkMinimumWage({ hourlyWage: 10_319 });
    expect(result.isAboveMinimum).toBe(false);
    expect(result.shortfallPerHour).toBe(1);
  });

  it("등록되지 않은 연도를 요청하면 최신 연도로 대체된다", () => {
    const result = checkMinimumWage({ hourlyWage: 10_320, year: 2099 });
    expect(result.minimumHourly).toBe(minimumWageByYear[2026].hourly);
  });
});
