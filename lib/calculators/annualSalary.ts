import { calculatePayrollDeductions, PayrollResult } from "./payrollDeductions";

export interface AnnualSalaryInput {
  annualSalary: number;
  nonTaxableAmount: number;
  dependents: number;
  childrenUnder20: number;
}

export interface AnnualSalaryResult extends PayrollResult {
  annualGross: number;
  annualDeduction: number;
  annualNet: number;
}

export function calculateAnnualSalary(input: AnnualSalaryInput): AnnualSalaryResult {
  const monthlySalary = Math.round(input.annualSalary / 12);
  const monthly = calculatePayrollDeductions({
    monthlySalary,
    nonTaxableAmount: input.nonTaxableAmount,
    dependents: input.dependents,
    childrenUnder20: input.childrenUnder20,
    year: 2026,
  });

  return {
    ...monthly,
    annualGross: monthlySalary * 12,
    annualDeduction: monthly.totalDeduction * 12,
    annualNet: monthly.netPay * 12,
  };
}
