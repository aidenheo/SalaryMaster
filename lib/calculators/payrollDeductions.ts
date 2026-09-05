import { getInsuranceRules } from "@/lib/rules/2026/insurance";
import {
  incomeTaxBrackets,
  incomeTaxRules2026,
  calcProgressiveTax,
  calcEarnedIncomeDeduction,
  calcEarnedIncomeTaxCreditCap,
} from "@/lib/rules/2026/incomeTax";

export interface PayrollInput {
  /** 세전 월급여 (원) */
  monthlySalary: number;
  /** 비과세 급여 (식대 등, 원) */
  nonTaxableAmount: number;
  /** 부양가족 수 (본인 포함) */
  dependents: number;
  /** 부양가족 중 8~20세 자녀 수 (자녀세액공제용) */
  childrenUnder20: number;
  year?: number;
}

export interface PayrollResult {
  grossSalary: number;
  taxableSalary: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeduction: number;
  netPay: number;
}

// 10원 미만 절사 (4대보험·원천세 실무 관행)
function roundDown10(value: number): number {
  return Math.max(0, Math.floor(value / 10) * 10);
}

export function calculatePayrollDeductions(input: PayrollInput): PayrollResult {
  const { monthlySalary, nonTaxableAmount, dependents, childrenUnder20 } = input;
  const year = input.year ?? 2026;
  const rules = getInsuranceRules(year);

  const taxableSalary = Math.max(0, monthlySalary - nonTaxableAmount);

  const pensionBase =
    taxableSalary <= 0
      ? 0
      : Math.min(Math.max(taxableSalary, rules.nationalPension.incomeFloor), rules.nationalPension.incomeCap);
  const nationalPension = roundDown10(pensionBase * rules.nationalPension.employeeRate);
  const healthInsurance = roundDown10(taxableSalary * rules.healthInsurance.employeeRate);
  const longTermCare = roundDown10(healthInsurance * rules.longTermCare.rateOfHealthInsurance);
  const employmentInsurance = roundDown10(taxableSalary * rules.employmentInsurance.employeeRate);

  const annualTotalWage = taxableSalary * 12;
  const earnedIncomeDeduction = calcEarnedIncomeDeduction(annualTotalWage);
  const earnedIncomeAmount = Math.max(0, annualTotalWage - earnedIncomeDeduction);
  const personalDeduction = Math.max(1, dependents) * incomeTaxRules2026.personalDeductionPerPerson;
  const socialInsuranceAnnual = (nationalPension + healthInsurance + longTermCare + employmentInsurance) * 12;

  const taxBase = Math.max(0, earnedIncomeAmount - personalDeduction - socialInsuranceAnnual);
  const calculatedTax = calcProgressiveTax(taxBase, incomeTaxBrackets);

  const earnedIncomeTaxCredit = calcEarnedIncomeTaxCredit(calculatedTax, annualTotalWage);
  const childTaxCredit = calcChildTaxCredit(childrenUnder20);

  const finalAnnualTax = Math.max(0, calculatedTax - earnedIncomeTaxCredit - childTaxCredit);
  const incomeTax = roundDown10(finalAnnualTax / 12);
  const localIncomeTax = roundDown10(incomeTax * incomeTaxRules2026.localIncomeTaxRate);

  const totalDeduction =
    nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax;

  return {
    grossSalary: monthlySalary,
    taxableSalary,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeduction,
    netPay: monthlySalary - totalDeduction,
  };
}

function calcEarnedIncomeTaxCredit(calculatedTax: number, annualTotalWage: number): number {
  if (calculatedTax <= 0) return 0;
  const { thresholdAmount, rateBelowThreshold, rateAboveThreshold } = incomeTaxRules2026.earnedIncomeTaxCredit;
  const raw =
    calculatedTax <= thresholdAmount
      ? calculatedTax * rateBelowThreshold
      : thresholdAmount * rateBelowThreshold + (calculatedTax - thresholdAmount) * rateAboveThreshold;

  return Math.min(raw, calcEarnedIncomeTaxCreditCap(annualTotalWage));
}

function calcChildTaxCredit(childrenUnder20: number): number {
  const { oneChild, twoChildren, perAdditionalChild } = incomeTaxRules2026.childTaxCredit;
  if (childrenUnder20 <= 0) return 0;
  if (childrenUnder20 === 1) return oneChild;
  if (childrenUnder20 === 2) return twoChildren;
  return twoChildren + (childrenUnder20 - 2) * perAdditionalChild;
}
