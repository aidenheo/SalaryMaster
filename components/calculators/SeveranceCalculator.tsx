"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import DateField from "@/components/ui/DateField";
import { ResultHighlight, ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { calculateSeverance } from "@/lib/calculators/severance";

export default function SeveranceCalculator() {
  const [hireDate, setHireDate] = useState("2023-01-01");
  const [resignDate, setResignDate] = useState("2026-01-01");
  const [last3MonthsTotalWage, setLast3MonthsTotalWage] = useState(9_000_000);
  const [annualBonusTotal, setAnnualBonusTotal] = useState(0);
  const [annualLeaveAllowance, setAnnualLeaveAllowance] = useState(0);

  const dateError = resignDate < hireDate ? "퇴사일은 입사일보다 빠를 수 없습니다." : undefined;

  const result = useMemo(
    () =>
      calculateSeverance({
        hireDate,
        resignDate,
        last3MonthsTotalWage,
        annualBonusTotal,
        annualLeaveAllowance,
      }),
    [hireDate, resignDate, last3MonthsTotalWage, annualBonusTotal, annualLeaveAllowance]
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <DateField label="입사일" value={hireDate} onChange={setHireDate} />
        <DateField label="퇴사일" value={resignDate} onChange={setResignDate} error={dateError} />
        <NumberField
          label="퇴직 전 3개월 총 급여"
          value={last3MonthsTotalWage}
          onChange={setLast3MonthsTotalWage}
          suffix="원"
          helpText="최근 3개월간 받은 세전 임금 총액(기본급+수당)"
        />
        <NumberField
          label="연간 상여금 총액"
          value={annualBonusTotal}
          onChange={setAnnualBonusTotal}
          suffix="원"
          helpText="퇴직 전 1년간 받은 상여금 합계 (없으면 0)"
        />
        <NumberField
          label="연차수당(전전년도 미사용분)"
          value={annualLeaveAllowance}
          onChange={setAnnualLeaveAllowance}
          suffix="원"
          helpText="퇴직 전전년도에 발생해 미사용 정산받은 연차수당 (없으면 0)"
        />
      </div>

      <div className="space-y-3">
        <ResultHighlight label="예상 퇴직금" value={dateError ? 0 : result.expectedSeverancePay} />
        {!dateError && !result.eligible && (
          <p className="rounded-md bg-danger-bg px-4 py-3 text-sm text-danger">
            계속근로기간이 1년 미만이라 퇴직금 지급 대상이 아닙니다. (근로자퇴직급여보장법 §4)
          </p>
        )}
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="계속근로일수" value={result.continuousServiceDays} unit="일" />
          <ResultRow label="1일 평균임금" value={Math.round(result.averageDailyWage)} />
        </div>
        <CalcStandardNote sources={["고용노동부", "근로자퇴직급여보장법"]} />
      </div>
    </div>
  );
}
