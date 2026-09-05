"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import { ResultHighlight, ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { calculateSalary } from "@/lib/calculators/salary";

export default function SalaryCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [nonTaxableAmount, setNonTaxableAmount] = useState(0);
  const [dependents, setDependents] = useState(1);
  const [childrenUnder20, setChildrenUnder20] = useState(0);

  const result = useMemo(
    () =>
      calculateSalary({
        monthlySalary,
        nonTaxableAmount,
        dependents: Math.max(1, dependents),
        childrenUnder20,
      }),
    [monthlySalary, nonTaxableAmount, dependents, childrenUnder20]
  );

  const nonTaxableError =
    nonTaxableAmount > monthlySalary && monthlySalary > 0 ? "비과세액이 월급보다 클 수 없습니다." : undefined;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="월급 (세전)" value={monthlySalary} onChange={setMonthlySalary} suffix="원" />
        <NumberField
          label="비과세 급여"
          value={nonTaxableAmount}
          onChange={setNonTaxableAmount}
          suffix="원"
          helpText="식대(월 20만원 한도) 등 세금이 붙지 않는 금액"
          error={nonTaxableError}
        />
        <NumberField
          label="부양가족 수 (본인 포함)"
          value={dependents}
          onChange={(v) => setDependents(Math.max(1, v))}
          suffix="명"
          min={1}
          max={20}
        />
        <NumberField
          label="8~20세 자녀 수"
          value={childrenUnder20}
          onChange={setChildrenUnder20}
          suffix="명"
          max={20}
          helpText="자녀세액공제 계산에 사용됩니다"
        />
      </div>

      <div className="space-y-3">
        <ResultHighlight label="예상 실수령액 (월)" value={monthlySalary > 0 ? result.netPay : 0} />
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="세전 급여" value={result.grossSalary} />
          <ResultRow label="국민연금" value={result.nationalPension} negative />
          <ResultRow label="건강보험" value={result.healthInsurance} negative />
          <ResultRow label="장기요양보험" value={result.longTermCare} negative />
          <ResultRow label="고용보험" value={result.employmentInsurance} negative />
          <ResultRow label="소득세" value={result.incomeTax} negative />
          <ResultRow label="지방소득세" value={result.localIncomeTax} negative />
        </div>
        <CalcStandardNote sources={["국민연금공단", "국민건강보험공단", "고용노동부", "국세청"]} />
      </div>
    </div>
  );
}
