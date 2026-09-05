import { calculatePayrollDeductions, PayrollResult } from "./payrollDeductions";

export interface SalaryInput {
  monthlySalary: number;
  nonTaxableAmount: number;
  dependents: number;
  childrenUnder20: number;
}

export function calculateSalary(input: SalaryInput): PayrollResult {
  return calculatePayrollDeductions({ ...input, year: 2026 });
}
