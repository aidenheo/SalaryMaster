/**
 * 4대보험 요율 데이터 (근로자 부담분 기준).
 *
 * 출처
 * - 국민연금: 국민연금공단 고시. 2026.1.1부터 보험료율 9.5%(근로자 4.75% / 사업주 4.75%)로 인상
 *   (2025년 국민연금 개혁법에 따른 단계적 인상, 2026년 첫 적용).
 *   기준소득월액 상한 659만원 / 하한 41만원은 2026.7 ~ 2027.6 적용분(국민연금공단 고시).
 *   2026.1 ~ 2026.6 기간은 직전 고시(상한 637만원 / 하한 40만원)가 적용되나,
 *   본 계산기는 2026년 대표값으로 최신 고시(하반기 기준)를 사용한다.
 * - 건강보험: 국민건강보험공단 고시. 2026년 직장가입자 보험료율 7.19%(근로자 3.595% / 사업주 3.595%).
 * - 장기요양보험: 보건복지부 고시. 2026년 장기요양보험료율은 건강보험료의 13.14%.
 * - 고용보험: 고용노동부 고시. 실업급여 보험료율 1.8%(근로자 0.9% / 사업주 0.9%).
 *   사업주 부담분인 고용안정·직업능력개발사업 요율은 근로자 실수령액 계산과 무관하므로 제외.
 */
export interface InsuranceRuleYear {
  nationalPension: {
    employeeRate: number;
    incomeFloor: number;
    incomeCap: number;
  };
  healthInsurance: {
    employeeRate: number;
  };
  longTermCare: {
    // 건강보험료 대비 비율
    rateOfHealthInsurance: number;
  };
  employmentInsurance: {
    employeeRate: number;
  };
  source: string;
}

export const insuranceRulesByYear: Record<number, InsuranceRuleYear> = {
  2026: {
    nationalPension: {
      employeeRate: 0.0475,
      incomeFloor: 410000,
      incomeCap: 6590000,
    },
    healthInsurance: {
      employeeRate: 0.03595,
    },
    longTermCare: {
      rateOfHealthInsurance: 0.1314,
    },
    employmentInsurance: {
      employeeRate: 0.009,
    },
    source:
      "국민연금공단·국민건강보험공단·보건복지부·고용노동부 2026년 보험료율 고시",
  },
};

export const LATEST_INSURANCE_YEAR = 2026;

export function getInsuranceRules(year: number = LATEST_INSURANCE_YEAR): InsuranceRuleYear {
  return insuranceRulesByYear[year] ?? insuranceRulesByYear[LATEST_INSURANCE_YEAR];
}
