"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import { ResultHighlight, ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { calculateOvertime } from "@/lib/calculators/overtime";

export default function OvertimeCalculator() {
  const [hourlyWage, setHourlyWage] = useState(0);
  const [extensionHours, setExtensionHours] = useState(0);
  const [nightHours, setNightHours] = useState(0);
  const [holidayHours, setHolidayHours] = useState(0);

  const result = useMemo(
    () => calculateOvertime({ hourlyWage, extensionHours, nightHours, holidayHours }),
    [hourlyWage, extensionHours, nightHours, holidayHours]
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="시급 (통상임금 기준)" value={hourlyWage} onChange={setHourlyWage} suffix="원" />
        <NumberField label="연장근로시간" value={extensionHours} onChange={setExtensionHours} suffix="시간" max={200} />
        <NumberField
          label="야간근로시간"
          value={nightHours}
          onChange={setNightHours}
          suffix="시간"
          max={200}
          helpText="22:00~06:00 사이 근무시간"
        />
        <NumberField label="휴일근로시간" value={holidayHours} onChange={setHolidayHours} suffix="시간" max={200} />
      </div>

      <div className="space-y-3">
        <ResultHighlight label="총 예상 수당" value={result.totalAllowance} />
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="기본임금" value={result.basePay} />
          <ResultRow label="연장근로 가산(50%)" value={result.extensionPay} />
          <ResultRow label="야간근로 가산(50%)" value={result.nightPay} />
          <ResultRow label="휴일근로 가산" value={result.holidayPay} />
        </div>
        <CalcStandardNote sources={["고용노동부", "근로기준법 §56"]} />
      </div>
    </div>
  );
}
