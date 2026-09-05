import { laborRules2026 } from "@/lib/rules/2026/labor";

/**
 * 연장·야간·휴일근로수당 계산 (근로기준법 §56).
 * 같은 시간이 연장근로이면서 동시에 야간근로에 해당하면 두 가산이 모두 적용되므로
 * 그런 시간은 연장근로시간과 야간근로시간 입력란에 각각 포함해 입력한다.
 */
export interface OvertimeInput {
  hourlyWage: number;
  extensionHours: number;
  nightHours: number;
  holidayHours: number;
}

export interface OvertimeResult {
  basePay: number;
  extensionPay: number;
  nightPay: number;
  holidayPay: number;
  totalAllowance: number;
}

export function calculateOvertime(input: OvertimeInput): OvertimeResult {
  const { hourlyWage, extensionHours, nightHours, holidayHours } = input;
  const { extension, night, holiday } = laborRules2026.overtimeRates;

  const holidayWithin8 = Math.min(holidayHours, 8);
  const holidayBeyond8 = Math.max(0, holidayHours - 8);

  const basePay = Math.round((extensionHours + nightHours + holidayHours) * hourlyWage);
  const extensionPay = Math.round(extensionHours * hourlyWage * extension);
  const nightPay = Math.round(nightHours * hourlyWage * night);
  const holidayPay = Math.round(
    holidayWithin8 * hourlyWage * holiday.upTo8Hours + holidayBeyond8 * hourlyWage * holiday.beyond8Hours
  );

  return {
    basePay,
    extensionPay,
    nightPay,
    holidayPay,
    totalAllowance: basePay + extensionPay + nightPay + holidayPay,
  };
}
