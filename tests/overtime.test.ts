import { describe, it, expect } from "vitest";
import { calculateOvertime } from "@/lib/calculators/overtime";

describe("calculateOvertime", () => {
  it("연장근로 2시간은 시급의 1.5배로 계산된다", () => {
    const result = calculateOvertime({ hourlyWage: 10_000, extensionHours: 2, nightHours: 0, holidayHours: 0 });
    expect(result.basePay).toBe(20_000);
    expect(result.extensionPay).toBe(10_000);
    expect(result.totalAllowance).toBe(30_000);
  });

  it("휴일근로 8시간 이내는 시급의 1.5배가 적용된다", () => {
    const result = calculateOvertime({ hourlyWage: 10_000, extensionHours: 0, nightHours: 0, holidayHours: 8 });
    expect(result.holidayPay).toBe(40_000); // 8h * 10000 * 0.5
    expect(result.totalAllowance).toBe(80_000 + 40_000);
  });

  it("휴일근로 8시간 초과분은 시급의 2배가 적용된다", () => {
    const result = calculateOvertime({ hourlyWage: 10_000, extensionHours: 0, nightHours: 0, holidayHours: 10 });
    // 8h*0.5 + 2h*1.0 = 40,000 + 20,000
    expect(result.holidayPay).toBe(60_000);
  });

  it("연장근로와 야간근로가 겹치는 시간은 두 가산이 모두 반영된다", () => {
    const result = calculateOvertime({ hourlyWage: 10_000, extensionHours: 2, nightHours: 2, holidayHours: 0 });
    expect(result.extensionPay).toBe(10_000);
    expect(result.nightPay).toBe(10_000);
  });

  it("모든 시간이 0이면 수당도 0이다", () => {
    const result = calculateOvertime({ hourlyWage: 10_000, extensionHours: 0, nightHours: 0, holidayHours: 0 });
    expect(result.totalAllowance).toBe(0);
  });
});
