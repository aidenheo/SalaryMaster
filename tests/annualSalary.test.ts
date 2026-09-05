import { describe, it, expect } from "vitest";
import { calculateAnnualSalary } from "@/lib/calculators/annualSalary";

describe("calculateAnnualSalary", () => {
  it("연봉을 12로 나눈 값이 월 세전급여와 같다", () => {
    const result = calculateAnnualSalary({
      annualSalary: 42_000_000,
      nonTaxableAmount: 200_000,
      dependents: 1,
      childrenUnder20: 0,
    });
    expect(result.grossSalary).toBe(Math.round(42_000_000 / 12));
  });

  it("연간 실수령액은 월 실수령액의 12배다", () => {
    const result = calculateAnnualSalary({
      annualSalary: 60_000_000,
      nonTaxableAmount: 0,
      dependents: 1,
      childrenUnder20: 0,
    });
    expect(result.annualNet).toBe(result.netPay * 12);
  });

  it("연봉 0원이면 실수령액도 0원이다", () => {
    const result = calculateAnnualSalary({
      annualSalary: 0,
      nonTaxableAmount: 0,
      dependents: 1,
      childrenUnder20: 0,
    });
    expect(result.annualNet).toBe(0);
  });
});
