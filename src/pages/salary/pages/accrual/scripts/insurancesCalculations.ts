import {
    BasicRates,
    BusinessRates,
    Limits,
    StaticRates,
} from "../exports/utils";

export function calcSocialMoreThenMinimal(
    isCivilContract: boolean,
    accident: number,
    minimalSalary: number,
    employeeCumulativePerYear: number,
    currentCumulativeAccrual: number,
    value: number,
    minSocial: number
) {
    let overSocialLimit = 0;
    let social = 0;
    let insuranceSocialBase = 0;
    if (!isCivilContract) {
        accident = minimalSalary * StaticRates.accident;
        if (employeeCumulativePerYear < Limits.social) {
            // Если лимит с учетом начислений текущего месяца (currentCumulativeAccrual) превышен, то
            if (currentCumulativeAccrual > Limits.social) {
                overSocialLimit = currentCumulativeAccrual - Limits.social;
                // TODO: добавить разбивку по ставкам
                insuranceSocialBase = value - overSocialLimit;
                // Остаток до превышения выше мрот:
                // МРОТ * BasicRate, Остальное * BusinessRate,
                if (overSocialLimit > minimalSalary) {
                    minSocial = minimalSalary * BasicRates.social;
                    social =
                        (overSocialLimit - minimalSalary) *
                        BusinessRates.social;
                    // Остаток до превышения ниже мрот:
                } else {
                    social = minimalSalary * BasicRates.social;
                    insuranceSocialBase = value;
                }
                // Если лимит с учетом начислений текущего месяца НЕ превышен, то:
            } else {
                minSocial = minimalSalary * BasicRates.social;
                social = (value - minimalSalary) * BusinessRates.social;
                insuranceSocialBase = value;
            }
        } else {
            overSocialLimit = value;
        }
    }
    return {
        social,
        overSocialLimit,
        insuranceSocialBase,
        accident,
        minSocial,
    };
}

export function calcRetirementMoreThenMinimal(
    employeeCumulativePerYear: number,
    currentCumulativeAccrual: number,
    value: number,
    minimalSalary: number
) {
    let minRetirement = 0;
    let minSocial = 0;
    let overRetirmentLimit = 0;
    let retirement = 0;
    let insuranceRetirementBase = 0;
    if (employeeCumulativePerYear < Limits.retirement) {
        // Если лимит с учетом начислений текущего месяца (currentCumulativeAccrual) превышен, то
        if (currentCumulativeAccrual > Limits.retirement) {
            overRetirmentLimit = currentCumulativeAccrual - Limits.retirement;
            insuranceRetirementBase = value - overRetirmentLimit;
            // Остаток до превышения выше мрот:
            // МРОТ * BasicRate, Остальное * BusinessRate,
            if (overRetirmentLimit > minimalSalary) {
                minRetirement = minimalSalary * BasicRates.retirement;
                retirement =
                    (insuranceRetirementBase - minimalSalary) *
                    BusinessRates.retirement;
                // Остаток до превышения ниже мрот:
            } else {
                retirement = minimalSalary * BasicRates.retirement;
            }
            // Если лимит с учетом начислений текущего месяца НЕ превышен, то:
        } else {
            minRetirement = minimalSalary * BasicRates.retirement;
            retirement = (value - minimalSalary) * BusinessRates.retirement;
            insuranceRetirementBase = value;
        }
    } else {
        overRetirmentLimit = value;
    }
    return {
        minSocial,
        minRetirement,
        retirement,
        overRetirmentLimit,
        insuranceRetirementBase,
    };
}

export function calcSocialInsurance(
    isCivilContract: boolean,
    value: number,
    employeeCumulativePerYear: number,
    currentCumulativeAccrual: number,
    accidentRate: number,
    limit: number,
    socialRate: number
) {
    let social = 0;
    let accident = 0;
    let overSocialLimit = 0;
    let insuranceSocialBase = 0;

    if (!isCivilContract) {
        accident = value * accidentRate;
        if (employeeCumulativePerYear < limit) {
            if (currentCumulativeAccrual > limit) {
                overSocialLimit = currentCumulativeAccrual - limit;
                insuranceSocialBase = value - overSocialLimit;
                social = insuranceSocialBase * socialRate;
            } else {
                social = value * socialRate;
                insuranceSocialBase = value;
            }
        } else {
            overSocialLimit = value;
        }
    }
    return { social, accident, overSocialLimit, insuranceSocialBase };
}

export function calcRetirementInsurance(
    employeeCumulativePerYear: number,
    value: number,
    rate: number,
    limit: number,
    currentCumulativeAccrual: number
) {
    // const currentCumulativeAccrual = employeeCumulativePerYear + value;
    let overRetirmentLimit = 0;
    let retirement = 0;
    let insuranceRetirementBase = 0;
    // расчет взносов на пенсионное страхование с учетом лимита начисления
    if (employeeCumulativePerYear < limit) {
        if (currentCumulativeAccrual > limit) {
            overRetirmentLimit = currentCumulativeAccrual - limit;
            insuranceRetirementBase = value - overRetirmentLimit;
            retirement = insuranceRetirementBase * rate;
        } else {
            retirement = value * rate;
            insuranceRetirementBase = value;
        }
    } else {
        overRetirmentLimit = value;
    }
    return {
        overRetirmentLimit,
        retirement,
        insuranceRetirementBase,
    };
}
