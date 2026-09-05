"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import { ResultHighlight, ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { calculateAnnualSalary } from "@/lib/calculators/annualSalary";

export default function AnnualSalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState(0);
  const [nonTaxableAmount, setNonTaxableAmount] = useState(0);
  const [dependents, setDependents] = useState(1);
  const [childrenUnder20, setChildrenUnder20] = useState(0);

  const result = useMemo(
    () =>
      calculateAnnualSalary({
        annualSalary,
        nonTaxableAmount,
        dependents: Math.max(1, dependents),
        childrenUnder20,
      }),
    [annualSalary, nonTaxableAmount, dependents, childrenUnder20]
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <NumberField label="연봉 (세전)" value={annualSalary} onChange={setAnnualSalary} suffix="원" />
        <NumberField
          label="월 비과세 급여"
          value={nonTaxableAmount}
          onChange={setNonTaxableAmount}
          suffix="원"
          helpText="식대(월 20만원 한도) 등 세금이 붙지 않는 금액"
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
        <ResultHighlight label="예상 실수령액 (연간)" value={annualSalary > 0 ? result.annualNet : 0} />
        <div className="rounded-md border border-border bg-surface px-4">
          <ResultRow label="월 세전 급여" value={result.grossSalary} />
          <ResultRow label="월 공제액 합계" value={result.totalDeduction} negative />
          <ResultRow label="월 예상 실수령액" value={result.netPay} />
          <ResultRow label="연간 공제액 합계" value={result.annualDeduction} negative />
        </div>
        <CalcStandardNote sources={["국민연금공단", "국민건강보험공단", "고용노동부", "국세청"]} />
      </div>
    </div>
  );
}
