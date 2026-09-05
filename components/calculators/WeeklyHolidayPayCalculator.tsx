"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import { ResultHighlight, ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { calculateWeeklyHolidayPay } from "@/lib/calculators/weeklyHolidayPay";

export default function WeeklyHolidayPayCalculator() {
  const [hourlyWage, setHourlyWage] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [hoursPerDay, setHoursPerDay] = useState(0);

  const result = useMemo(
    () => calculateWeeklyHolidayPay({ hourlyWage, daysPerWeek, hoursPerDay }),
    [hourlyWage, daysPerWeek, hoursPerDay]
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="시급" value={hourlyWage} onChange={setHourlyWage} suffix="원" />
        <NumberField label="주 근무일수" value={daysPerWeek} onChange={setDaysPerWeek} suffix="일" min={0} max={7} />
        <NumberField label="1일 근무시간" value={hoursPerDay} onChange={setHoursPerDay} suffix="시간" min={0} max={24} />
      </div>

      <div className="space-y-3">
        <ResultHighlight label="예상 주휴수당" value={result.weeklyHolidayPay} />
        {!result.eligible && (
          <p className="rounded-md bg-danger-bg px-4 py-3 text-sm text-danger">
            주 소정근로시간이 15시간 미만이라 주휴수당 지급 대상이 아닙니다. (근로기준법 §55, 시행령 §30)
          </p>
        )}
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="주 근무시간" value={result.weeklyWorkHours} unit="시간" />
          <ResultRow label="주휴시간" value={result.weeklyHolidayHours} unit="시간" />
          <ResultRow label="기본 주급" value={result.weeklyBasePay} />
          <ResultRow label="예상 주급 (주휴수당 포함)" value={result.expectedWeeklyPay} />
        </div>
        <CalcStandardNote sources={["고용노동부", "근로기준법"]} />
      </div>
    </div>
  );
}
