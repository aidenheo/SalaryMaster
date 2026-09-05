import { describe, it, expect } from "vitest";
import { calculateSalary } from "@/lib/calculators/salary";

describe("calculateSalary", () => {
  it("계산한 실수령액이 세전급여보다 작다", () => {
    const result = calculateSalary({
      monthlySalary: 3_500_000,
      nonTaxableAmount: 200_000,
      dependents: 1,
      childrenUnder20: 0,
    });
    expect(result.netPay).toBeLessThan(result.grossSalary);
    expect(result.netPay).toBeGreaterThan(0);
  });

  it("3,500,000원 / 부양1 / 비과세 20만원 기준 실수령액이 합리적 범위(295만~315만)에 있다", () => {
    const result = calculateSalary({
      monthlySalary: 3_500_000,
      nonTaxableAmount: 200_000,
      dependents: 1,
      childrenUnder20: 0,
    });
    expect(result.netPay).toBeGreaterThan(2_950_000);
    expect(result.netPay).toBeLessThan(3_150_000);
  });

  it("월급이 0이면 모든 공제와 실수령액이 0이다", () => {
    const result = calculateSalary({
      monthlySalary: 0,
      nonTaxableAmount: 0,
      dependents: 1,
      childrenUnder20: 0,
    });
    expect(result.totalDeduction).toBe(0);
    expect(result.netPay).toBe(0);
  });

  it("비과세액이 월급보다 크면 과세대상 급여는 0으로 처리된다", () => {
    const result = calculateSalary({
      monthlySalary: 1_000_000,
      nonTaxableAmount: 2_000_000,
      dependents: 1,
      childrenUnder20: 0,
    });
    expect(result.taxableSalary).toBe(0);
    expect(result.nationalPension).toBe(0);
  });

  it("부양가족이 많을수록 실수령액이 같거나 더 많다(소득세 감소)", () => {
    const base = calculateSalary({
      monthlySalary: 5_000_000,
      nonTaxableAmount: 0,
      dependents: 1,
      childrenUnder20: 0,
    });
    const moreDependents = calculateSalary({
      monthlySalary: 5_000_000,
      nonTaxableAmount: 0,
      dependents: 4,
      childrenUnder20: 2,
    });
    expect(moreDependents.netPay).toBeGreaterThanOrEqual(base.netPay);
  });

  it("국민연금 기준소득월액 상한을 초과하는 고액 급여는 상한 기준으로 계산된다", () => {
    const result = calculateSalary({
      monthlySalary: 10_000_000,
      nonTaxableAmount: 0,
      dependents: 1,
      childrenUnder20: 0,
    });
    // 상한 6,590,000원 x 4.75% = 313,025원 -> 10원 절사 313,020원
    expect(result.nationalPension).toBe(313_020);
  });
});
