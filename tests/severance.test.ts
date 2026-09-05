import { describe, it, expect } from "vitest";
import { calculateSeverance } from "@/lib/calculators/severance";

describe("calculateSeverance", () => {
  it("근속 1년 미만이면 퇴직금 지급 대상이 아니다", () => {
    const result = calculateSeverance({
      hireDate: "2026-01-01",
      resignDate: "2026-06-30",
      last3MonthsTotalWage: 9_000_000,
      annualBonusTotal: 0,
      annualLeaveAllowance: 0,
    });
    expect(result.eligible).toBe(false);
    expect(result.expectedSeverancePay).toBe(0);
  });

  it("근속 1년 경계값은 퇴직금 지급 대상이다", () => {
    const result = calculateSeverance({
      hireDate: "2024-01-01",
      resignDate: "2025-01-01",
      last3MonthsTotalWage: 9_000_000,
      annualBonusTotal: 0,
      annualLeaveAllowance: 0,
    });
    expect(result.eligible).toBe(true);
    expect(result.expectedSeverancePay).toBeGreaterThan(0);
  });

  it("근속 3년, 월 300만원 수준이면 퇴직금은 대략 900만원 안팎이다", () => {
    const result = calculateSeverance({
      hireDate: "2023-01-01",
      resignDate: "2026-01-01",
      last3MonthsTotalWage: 9_000_000,
      annualBonusTotal: 0,
      annualLeaveAllowance: 0,
    });
    expect(result.expectedSeverancePay).toBeGreaterThan(8_500_000);
    expect(result.expectedSeverancePay).toBeLessThan(9_500_000);
  });

  it("퇴사일이 입사일보다 빠르면 근속일수가 음수로 계산되어 대상에서 제외된다", () => {
    const result = calculateSeverance({
      hireDate: "2026-01-01",
      resignDate: "2025-01-01",
      last3MonthsTotalWage: 9_000_000,
      annualBonusTotal: 0,
      annualLeaveAllowance: 0,
    });
    expect(result.continuousServiceDays).toBeLessThan(0);
    expect(result.eligible).toBe(false);
  });
});
