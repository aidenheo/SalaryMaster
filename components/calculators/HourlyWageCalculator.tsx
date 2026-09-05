"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import { ResultHighlight, ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { calculateHourlyWage } from "@/lib/calculators/hourlyWage";

export default function HourlyWageCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [weeklyWorkHours, setWeeklyWorkHours] = useState(0);

  const result = useMemo(
    () => calculateHourlyWage({ monthlySalary, weeklyWorkHours }),
    [monthlySalary, weeklyWorkHours]
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="월급" value={monthlySalary} onChange={setMonthlySalary} suffix="원" />
        <NumberField
          label="주 근로시간"
          value={weeklyWorkHours}
          onChange={setWeeklyWorkHours}
          suffix="시간"
          min={0}
          max={68}
          helpText="주휴시간을 제외한 실제 소정근로시간"
        />
      </div>

      <div className="space-y-3">
        <ResultHighlight label="환산 시급" value={result.hourlyWage} />
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="주휴시간" value={result.weeklyHolidayHours} unit="시간" />
          <ResultRow label="월 환산 근로시간" value={Math.round(result.monthlyWorkHours * 10) / 10} unit="시간" />
          <ResultRow label="예상 주급" value={result.weeklyPay} />
        </div>
        <CalcStandardNote sources={["고용노동부"]} />
      </div>
    </div>
  );
}
