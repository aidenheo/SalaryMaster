import { describe, it, expect } from "vitest";
import { calculateAnnualLeave } from "@/lib/calculators/annualLeave";

describe("calculateAnnualLeave", () => {
  it("입사 6개월차는 매월 개근 시 최대 6일의 연차가 발생한다", () => {
    const result = calculateAnnualLeave({
      hireDate: "2026-01-01",
      asOfDate: "2026-07-01",
      usedLeaveDays: 0,
      monthlyOrdinaryWage: 2_090_000,
      monthlyWorkHours: 209,
    });
    expect(result.accruedLeaveDays).toBe(6);
  });

  it("입사 1년 미만은 최대 11일을 넘지 않는다", () => {
    const result = calculateAnnualLeave({
      hireDate: "2025-01-01",
      asOfDate: "2025-12-31",
      usedLeaveDays: 0,
      monthlyOrdinaryWage: 2_090_000,
      monthlyWorkHours: 209,
    });
    expect(result.accruedLeaveDays).toBeLessThanOrEqual(11);
  });

  it("근속 1년 기준 15일의 연차가 발생한다", () => {
    const result = calculateAnnualLeave({
      hireDate: "2025-01-01",
      asOfDate: "2026-01-01",
      usedLeaveDays: 5,
      monthlyOrdinaryWage: 2_090_000,
      monthlyWorkHours: 209,
    });
    expect(result.accruedLeaveDays).toBe(15);
    expect(result.remainingLeaveDays).toBe(10);
  });

  it("근속 3년차에는 16일(15+1)의 연차가 발생한다", () => {
    const result = calculateAnnualLeave({
      hireDate: "2023-01-01",
      asOfDate: "2026-01-01",
      usedLeaveDays: 0,
      monthlyOrdinaryWage: 2_090_000,
      monthlyWorkHours: 209,
    });
    expect(result.accruedLeaveDays).toBe(16);
  });

  it("사용 연차가 발생 연차보다 많아도 잔여 연차는 음수가 되지 않는다", () => {
    const result = calculateAnnualLeave({
      hireDate: "2025-01-01",
      asOfDate: "2026-01-01",
      usedLeaveDays: 100,
      monthlyOrdinaryWage: 2_090_000,
      monthlyWorkHours: 209,
    });
    expect(result.remainingLeaveDays).toBe(0);
  });
});
