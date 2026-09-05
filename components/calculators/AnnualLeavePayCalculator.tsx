"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import DateField from "@/components/ui/DateField";
import { ResultHighlight, ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { calculateAnnualLeave } from "@/lib/calculators/annualLeave";

export default function AnnualLeavePayCalculator() {
  const [hireDate, setHireDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");
  const [usedLeaveDays, setUsedLeaveDays] = useState(0);
  const [monthlyOrdinaryWage, setMonthlyOrdinaryWage] = useState(0);
  const [monthlyWorkHours, setMonthlyWorkHours] = useState(0);

  const datesIncomplete = !hireDate || !asOfDate;
  const dateError =
    !datesIncomplete && asOfDate < hireDate ? "기준일은 입사일보다 빠를 수 없습니다." : undefined;

  const result = useMemo(
    () =>
      calculateAnnualLeave({
        hireDate,
        asOfDate,
        usedLeaveDays,
        monthlyOrdinaryWage,
        monthlyWorkHours,
      }),
    [hireDate, asOfDate, usedLeaveDays, monthlyOrdinaryWage, monthlyWorkHours]
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <DateField label="입사일" value={hireDate} onChange={setHireDate} />
        <DateField label="기준일" value={asOfDate} onChange={setAsOfDate} error={dateError} />
        <NumberField label="이미 사용한 연차일수" value={usedLeaveDays} onChange={setUsedLeaveDays} suffix="일" max={30} />
        <NumberField
          label="월 통상임금"
          value={monthlyOrdinaryWage}
          onChange={setMonthlyOrdinaryWage}
          suffix="원"
          helpText="기본급+고정수당 등 통상임금에 해당하는 월급"
        />
        <NumberField
          label="월 소정근로시간"
          value={monthlyWorkHours}
          onChange={setMonthlyWorkHours}
          suffix="시간"
          helpText="주 40시간 근무 시 통상 209시간"
        />
      </div>

      <div className="space-y-3">
        <ResultHighlight
          label="예상 연차수당"
          value={dateError || datesIncomplete ? 0 : result.expectedLeaveAllowance}
        />
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="발생 연차" value={datesIncomplete ? 0 : result.accruedLeaveDays} unit="일" />
          <ResultRow label="잔여 연차" value={datesIncomplete ? 0 : result.remainingLeaveDays} unit="일" />
          <ResultRow label="1일 통상임금" value={result.dailyOrdinaryWage} />
        </div>
        <CalcStandardNote sources={["고용노동부", "근로기준법 §60"]} />
      </div>
    </div>
  );
}
