"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import { ResultRow } from "@/components/ui/ResultDisplay";
import CalcStandardNote from "@/components/CalcStandardNote";
import { checkMinimumWage, type MinimumWagePayType } from "@/lib/calculators/minimumWage";

const PAY_TYPES: { value: MinimumWagePayType; label: string }[] = [
  { value: "hourly", label: "시급" },
  { value: "daily", label: "일급" },
  { value: "weekly", label: "주급" },
  { value: "monthly", label: "월급" },
];

const PAY_LABEL: Record<MinimumWagePayType, string> = {
  hourly: "시급",
  daily: "일급",
  weekly: "주급 (세전)",
  monthly: "월 급여 (최저임금 산입 임금)",
};

const PAY_HELP: Record<MinimumWagePayType, string | undefined> = {
  hourly: undefined,
  daily: "1일치 세전 임금",
  weekly: "1주치 세전 임금(주휴수당 포함)",
  monthly:
    "기본급 + 매월 정기 지급되는 상여금·식대 등. 연장·휴일근로에 대한 임금, 연장·야간·휴일근로 가산수당, 연차 미사용수당은 빼고 입력",
};

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export default function MinimumWageCalculator() {
  const [payType, setPayType] = useState<MinimumWagePayType>("hourly");
  const [pay, setPay] = useState(0);
  const [hoursPerDay, setHoursPerDay] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState(0);

  const result = useMemo(
    () => checkMinimumWage({ payType, pay, hoursPerDay, daysPerWeek }),
    [payType, pay, hoursPerDay, daysPerWeek]
  );

  const needsSchedule = payType !== "hourly";
  const needsDaysPerWeek = payType === "weekly" || payType === "monthly";

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <div>
          <span className="mb-1 block text-sm font-medium text-foreground">급여 형태</span>
          <div className="grid grid-cols-4 gap-1 rounded-md border border-border bg-surface p-1">
            {PAY_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => {
                  setPayType(t.value);
                  setPay(0);
                }}
                aria-pressed={payType === t.value}
                className={`rounded px-2 py-1.5 text-sm ${
                  payType === t.value
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-background"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <NumberField
          label={PAY_LABEL[payType]}
          value={pay}
          onChange={setPay}
          suffix="원"
          helpText={PAY_HELP[payType]}
        />

        {needsSchedule && (
          <NumberField
            label="1일 소정근로시간"
            value={hoursPerDay}
            onChange={setHoursPerDay}
            suffix="시간"
            min={0}
            max={payType === "daily" ? 8 : 24}
            helpText={
              payType === "daily"
                ? "1일 8시간까지 입력합니다. 연장근로(1일 8시간 초과)에 대한 임금은 일급에서 빼고 입력하세요."
                : "휴게시간을 뺀 실근로시간. 주 40시간을 넘는 시간은 연장근로로 보아 제외합니다."
            }
          />
        )}

        {needsDaysPerWeek && (
          <NumberField
            label="주 소정근로일수"
            value={daysPerWeek}
            onChange={setDaysPerWeek}
            suffix="일"
            min={0}
            max={7}
          />
        )}
      </div>

      <div className="space-y-3">
        {result.hasEnoughInput ? (
          <>
            <div
              className={`rounded-lg px-5 py-6 text-white ${
                result.meetsMinimum ? "bg-success" : "bg-danger"
              }`}
            >
              <p className="text-sm text-white/85">
                {result.meetsMinimum
                  ? "입력 기준 최저임금 이상입니다"
                  : "입력 기준 최저임금에 미달합니다"}
              </p>
              <p className="mt-1 text-2xl font-bold sm:text-3xl">
                {result.differencePerHour >= 0 ? "+" : "-"}
                {Math.abs(result.differencePerHour).toLocaleString("ko-KR")}원
                <span className="ml-1 text-base font-medium text-white/80">/ 시간</span>
              </p>
            </div>

            <div className="rounded-md border border-border bg-surface px-4">
              <ResultRow label="환산 시급" value={Math.round(result.hourlyEquivalent)} />
              <ResultRow label={`${result.year}년 최저시급`} value={result.minimumHourly} />
              {needsDaysPerWeek && (
                <ResultRow
                  label="적용 소정근로시간(주)"
                  value={round1(result.contractedWeeklyHours)}
                  unit="시간"
                />
              )}
              {needsDaysPerWeek && (
                <ResultRow
                  label="주휴시간(주)"
                  value={round1(result.weeklyHolidayHours)}
                  unit="시간"
                />
              )}
              {payType === "monthly" && (
                <ResultRow label="월 환산 근로시간" value={result.monthlyHours} unit="시간" />
              )}
            </div>

            <div className="rounded-md border border-border bg-surface px-4">
              <ResultRow label="월 환산액(주 40시간·209시간 기준)" value={result.monthlyEquivalent} />
              <ResultRow label={`${result.year}년 최저 월 환산액`} value={result.minimumMonthly} />
            </div>

            <p className="text-xs leading-relaxed text-muted">
              {payType === "monthly"
                ? "월급제는 기본급과 매월 정기적으로 지급되는 상여금·복리후생비(식대 등)를 합한 금액으로 비교합니다. 연장·휴일근로에 대한 임금, 연장·야간·휴일근로 가산수당, 연차 미사용수당, 1년에 한 번 지급하는 상여금은 최저임금에 산입되지 않으므로 빼고 입력하세요."
                : "연장·휴일근로에 대한 임금, 연장·야간·휴일근로 가산수당, 연차 미사용수당 등 최저임금에 산입되지 않는 임금은 빼고 입력하세요."}
              {" "}정확한 판단은 근로계약 내용과 실제 임금 구성에 따라 달라질 수 있습니다.
            </p>

            <CalcStandardNote
              sources={["고용노동부 2026년 적용 최저임금 고시", "최저임금위원회"]}
            />
          </>
        ) : (
          <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted">
            급여 형태와 금액{needsSchedule ? ", 근로시간" : ""}을 입력하면
            <br />
            최저임금 충족 여부를 확인할 수 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}
