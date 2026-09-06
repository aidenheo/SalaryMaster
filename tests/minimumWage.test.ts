import { describe, it, expect } from "vitest";
import { checkMinimumWage } from "@/lib/calculators/minimumWage";
import { getMinimumWage, minimumWageByYear } from "@/lib/rules/2026/minimumWage";

describe("checkMinimumWage – 기준값", () => {
  it("2026년 최저시급은 10,320원이다", () => {
    expect(getMinimumWage(2026).hourly).toBe(10_320);
  });

  it("등록되지 않은 연도를 요청하면 최신 연도로 대체된다", () => {
    const result = checkMinimumWage({ hourlyWage: 10_320, year: 2099 });
    expect(result.minimumHourly).toBe(minimumWageByYear[2026].hourly);
  });
});

describe("checkMinimumWage – 시급", () => {
  it("최저시급보다 낮으면 미달로 판정하고 차액을 계산한다", () => {
    const result = checkMinimumWage({ payType: "hourly", pay: 10_000 });
    expect(result.meetsMinimum).toBe(false);
    expect(result.differencePerHour).toBe(-320);
    expect(result.shortfallPerHour).toBe(320);
  });

  it("최저시급과 정확히 같으면 미달이 아니다(경계값)", () => {
    const result = checkMinimumWage({ hourlyWage: 10_320 });
    expect(result.isAboveMinimum).toBe(true);
    expect(result.shortfallPerHour).toBe(0);
    expect(result.differencePerHour).toBe(0);
  });

  it("최저시급보다 1원 낮으면 미달이다(경계값)", () => {
    const result = checkMinimumWage({ hourlyWage: 10_319 });
    expect(result.isAboveMinimum).toBe(false);
    expect(result.shortfallPerHour).toBe(1);
  });

  it("최저시급보다 높으면 충족이고 차액은 양수다", () => {
    const result = checkMinimumWage({ payType: "hourly", pay: 12_000 });
    expect(result.meetsMinimum).toBe(true);
    expect(result.differencePerHour).toBe(1_680);
  });
});

describe("checkMinimumWage – 일급", () => {
  it("일급을 1일 소정근로시간으로 나눠 시급으로 환산한다", () => {
    const result = checkMinimumWage({ payType: "daily", pay: 90_000, hoursPerDay: 8 });
    expect(result.hourlyEquivalent).toBe(11_250);
    expect(result.meetsMinimum).toBe(true);
  });

  it("환산 시급이 최저시급에 미달하면 미달로 판정한다", () => {
    const result = checkMinimumWage({ payType: "daily", pay: 80_000, hoursPerDay: 8 });
    expect(Math.round(result.hourlyEquivalent)).toBe(10_000);
    expect(result.meetsMinimum).toBe(false);
  });

  it("1일 8시간을 초과해 입력해도 소정근로시간은 8시간으로 제한한다", () => {
    const result = checkMinimumWage({ payType: "daily", pay: 82_560, hoursPerDay: 10 });
    expect(result.hourlyEquivalent).toBe(10_320);
    expect(result.meetsMinimum).toBe(true);
  });

  it("근로시간이 없으면 입력 부족으로 처리하고 NaN을 만들지 않는다", () => {
    const result = checkMinimumWage({ payType: "daily", pay: 90_000, hoursPerDay: 0 });
    expect(result.hasEnoughInput).toBe(false);
    expect(Number.isFinite(result.hourlyEquivalent)).toBe(true);
    expect(result.hourlyEquivalent).toBe(0);
  });
});

describe("checkMinimumWage – 주급", () => {
  it("주 40시간 근무는 주휴 8시간을 더한 48시간으로 나눈다", () => {
    const result = checkMinimumWage({
      payType: "weekly",
      pay: 495_360, // 10,320 × 48
      hoursPerDay: 8,
      daysPerWeek: 5,
    });
    expect(result.contractedWeeklyHours).toBe(40);
    expect(result.weeklyHolidayHours).toBe(8);
    expect(result.hourlyEquivalent).toBe(10_320);
    expect(result.meetsMinimum).toBe(true);
  });

  it("주 15시간 미만이면 주휴시간을 인정하지 않는다(경계값)", () => {
    const result = checkMinimumWage({
      payType: "weekly",
      pay: 140_000,
      hoursPerDay: 7,
      daysPerWeek: 2, // 14시간
    });
    expect(result.contractedWeeklyHours).toBe(14);
    expect(result.weeklyHolidayHours).toBe(0);
    expect(result.hourlyEquivalent).toBe(10_000);
  });

  it("주 15시간이면 비례 주휴시간을 인정한다(경계값)", () => {
    const result = checkMinimumWage({
      payType: "weekly",
      pay: 200_000,
      hoursPerDay: 5,
      daysPerWeek: 3, // 15시간
    });
    expect(result.weeklyHolidayHours).toBeCloseTo(3, 5);
    // 15 + 3 = 18시간으로 나눔
    expect(result.hourlyEquivalent).toBeCloseTo(200_000 / 18, 5);
  });
});

describe("checkMinimumWage – 월급", () => {
  it("주 40시간 근무 월급은 209시간으로 나눠 시급으로 환산한다", () => {
    const result = checkMinimumWage({
      payType: "monthly",
      pay: 2_156_880,
      hoursPerDay: 8,
      daysPerWeek: 5,
    });
    expect(result.monthlyHours).toBe(209);
    expect(Math.round(result.hourlyEquivalent)).toBe(10_320);
    expect(result.meetsMinimum).toBe(true);
    expect(result.differencePerHour).toBe(0);
  });

  it("공식 월 환산액보다 낮은 월급은 미달로 판정한다", () => {
    const result = checkMinimumWage({
      payType: "monthly",
      pay: 2_100_000,
      hoursPerDay: 8,
      daysPerWeek: 5,
    });
    expect(result.meetsMinimum).toBe(false);
    expect(result.differencePerHour).toBeLessThan(0);
  });

  it("근로시간이 다르면 그 조건에 맞는 월 환산 시간으로 계산한다", () => {
    const result = checkMinimumWage({
      payType: "monthly",
      pay: 1_200_000,
      hoursPerDay: 5,
      daysPerWeek: 4, // 주 20시간, 주휴 4시간
    });
    expect(result.contractedWeeklyHours).toBe(20);
    expect(result.weeklyHolidayHours).toBe(4);
    expect(result.monthlyHours).toBe(Math.round(24 * (365 / 7 / 12)));
    expect(result.hourlyEquivalent).toBeCloseTo(1_200_000 / result.monthlyHours, 5);
  });

  it("주 6일·1일 10시간을 입력해도 소정근로는 주 40시간으로 제한한다", () => {
    const result = checkMinimumWage({
      payType: "monthly",
      pay: 2_200_000,
      hoursPerDay: 10,
      daysPerWeek: 6,
    });
    expect(result.contractedWeeklyHours).toBe(40);
    expect(result.monthlyHours).toBe(209);
  });
});

describe("checkMinimumWage – 빈 입력·잘못된 입력", () => {
  it("아무것도 입력하지 않으면 판정하지 않는다", () => {
    const result = checkMinimumWage({});
    expect(result.hasEnoughInput).toBe(false);
    expect(result.meetsMinimum).toBe(false);
    expect(Number.isFinite(result.hourlyEquivalent)).toBe(true);
  });

  it("음수 임금은 0으로 처리한다", () => {
    const result = checkMinimumWage({ payType: "hourly", pay: -5_000 });
    expect(result.hasEnoughInput).toBe(false);
    expect(result.hourlyEquivalent).toBe(0);
  });

  it("월급 형태에서 근로시간이 비어 있으면 판정하지 않는다", () => {
    const result = checkMinimumWage({ payType: "monthly", pay: 2_000_000 });
    expect(result.hasEnoughInput).toBe(false);
    expect(result.monthlyHours).toBe(0);
    expect(Number.isFinite(result.hourlyEquivalent)).toBe(true);
  });
});
