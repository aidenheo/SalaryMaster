/**
 * 근로기준법 기준 데이터 (연도 변화가 거의 없는 법정 기준).
 * 출처: 근로기준법 제55조(주휴일), 제56조(연장·야간·휴일근로),
 *       제60조(연차유급휴가), 제34조 및 근로자퇴직급여보장법 제8조(퇴직금).
 */
export const laborRules2026 = {
  // 주휴수당 발생 최소 근로시간 (근로기준법 §55, 시행령 §30)
  weeklyHolidayMinHours: 15,
  // 연장·야간·휴일근로 가산율 (근로기준법 §56)
  overtimeRates: {
    extension: 0.5, // 연장근로 가산 50%
    night: 0.5, // 야간근로(22:00~06:00) 가산 50%
    holiday: {
      upTo8Hours: 0.5, // 휴일근로 8시간 이내 가산 50%
      beyond8Hours: 1.0, // 휴일근로 8시간 초과분 가산 100%
    },
  },
  // 법정 소정근로시간 (주 40시간제 기준)
  standardWeeklyHours: 40,
  standardMonthlyHours: 209,
  // 연차유급휴가 (근로기준법 §60)
  annualLeave: {
    firstYearMonthlyGrant: 1, // 입사 1년 미만 매월 개근 시 1일
    firstYearMaxDays: 11,
    baseYearlyDays: 15, // 1년간 80% 이상 출근 시 15일
    additionalPerTwoYears: 1, // 3년차부터 매 2년마다 1일 가산
    maxDays: 25,
  },
  source: "근로기준법 §55, §56, §60, 근로자퇴직급여보장법 §8",
};
