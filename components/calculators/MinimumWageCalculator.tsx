"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import { ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { checkMinimumWage } from "@/lib/calculators/minimumWage";

export default function MinimumWageCalculator() {
  const [hourlyWage, setHourlyWage] = useState(0);

  const result = useMemo(() => checkMinimumWage({ hourlyWage }), [hourlyWage]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="내 시급" value={hourlyWage} onChange={setHourlyWage} suffix="원" />
      </div>

      <div className="space-y-3">
        <div
          className={`rounded-lg px-5 py-6 text-white ${result.isAboveMinimum ? "bg-success" : "bg-danger"}`}
        >
          <p className="text-sm text-white/85">
            {result.isAboveMinimum ? "최저임금을 충족합니다" : "최저임금에 미달합니다"}
          </p>
          <p className="mt-1 text-2xl font-bold sm:text-3xl">
            {result.isAboveMinimum
              ? `+${(hourlyWage - result.minimumHourly).toLocaleString("ko-KR")}원`
              : `-${result.shortfallPerHour.toLocaleString("ko-KR")}원`}
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="2026년 최저시급" value={result.minimumHourly} />
          <ResultRow label="2026년 최저월급(209시간 기준)" value={result.minimumMonthly} />
        </div>
        <CalcStandardNote sources={["고용노동부 2026년 적용 최저임금 고시"]} />
      </div>
    </div>
  );
}
