import { ISalaries, ISalary } from "../../exports/interfaces";
import {
    BasicRates,
    BusinessRates,
    itRates,
    Limits,
    MinimalSalary01012022,
    MinimalSalary01062022,
    Months,
    months,
    StaticRates,
} from "../../exports/utils";

// Расчет вычетов
const calcRecoupment = (childrenQtty: number) => {
    if (childrenQtty <= 2) return childrenQtty * 1400;
    else return (childrenQtty - 2) * 3000 + 2800;
};
// Получение МРОТ
const getMinimalSalary = (month: string) => {
    if (
        month === Months.jan ||
        month === Months.feb ||
        month === Months.march ||
        month === Months.april ||
        month === Months.may
    )
        return MinimalSalary01012022;
    else return MinimalSalary01062022;
};

// Перерасчет НДФЛ с учетом вычетов
export const calcPIT = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
    const recoupment = calcRecoupment(+value);
    const accrued = +state.months[table].salary[index].accrued;
    const taxPITBase = +accrued - +recoupment;
    const PIT = taxPITBase * StaticRates.PIT;
    const payment = accrued - PIT;

    return { PIT, payment };
};

// Базовый расчет НДФЛ
export const calcBasicPIT = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
    // НДФЛ (personal income tax)
    const recoupment = calcRecoupment(
        state.months[table].salary[index].childrenQtty
    );
    const PIT = (value - recoupment) * StaticRates.PIT;
    const payment = value - PIT;
    return { PIT, payment };
};

// Расчет страховых взносов по базовой ставке. Код 01
export const calcBasicTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
): {
    accident: number;
    medical: number;
    retirement: number;
    social: number;
    total: number;
    employeeCumulativeTotal: number;
    overSocialLimit: number;
    overRetirmentLimit: number;
    insuranceRetirementBase: number;
    insuranceSocialBase: number;
} => {
    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let retirement = 0;
    let social = 0;
    let overSocialLimit = 0;
    let overRetirmentLimit = 0;
    let insuranceRetirementBase = 0;
    let insuranceSocialBase = 0;
    let accident = 0;
    // 1) Найти сотрудника по которому происходят изменения: получить его id
    const { employeeId } = state.months[table].salary[index];
    let isCivil = false;

    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    const employeeAccruals: ISalary[] = [];
    for (const month in state.months) {
        // 2) по id сотрудника выбрать начисления в предшествующих месяцах...
        if (employeeId) {
            const employeeAccrual: ISalary = state.months[month].salary.find(
                (accrual: ISalary) => accrual.employeeId === employeeId
            );
            isCivil = employeeAccrual?.civilContract;
            if (monthCounter === monthNumber) break;
            // ... если не undefined
            employeeAccrual && employeeAccruals.push(employeeAccrual);
        }
        monthCounter++;
    }

    // 3) сложить начисленные суммы
    employeeCumulativeTotal = employeeAccruals.reduce(
        (accrualSumm, current) => accrualSumm + current.accrued,
        0
    );

    // начисления ЗП с учетом начисления за текущий месяц
    const currentCumulativeAccrual = employeeCumulativeTotal + value;
    // расчет взносов на пенсионное страхование с учетом лимита начисления
    // let insuranceRetirementBase = 0;
    if (employeeCumulativeTotal < Limits.retirement) {
        if (currentCumulativeAccrual > Limits.retirement) {
            overRetirmentLimit = currentCumulativeAccrual - Limits.retirement;
            insuranceRetirementBase = value - overRetirmentLimit;
            retirement = insuranceRetirementBase * BasicRates.retirement;
        } else {
            retirement = value * BasicRates.retirement;
            insuranceRetirementBase = value;
        }
    } else {
        overRetirmentLimit = value;
    }
    // расчет взносов на социальное страхование с учетом лимита начисления
    if (!isCivil) {
        accident = value * StaticRates.accident;
        if (employeeCumulativeTotal < Limits.social) {
            if (currentCumulativeAccrual > Limits.social) {
                overSocialLimit = currentCumulativeAccrual - Limits.social;
                insuranceSocialBase = value - overSocialLimit;
                social = insuranceSocialBase * BasicRates.social;
            } else {
                social = value * BasicRates.social;
                insuranceSocialBase = value;
            }
        } else {
            overSocialLimit = value;
        }
    }

    const medical = value * BasicRates.medical;
    const total = medical + retirement + social + accident;
    return {
        accident,
        medical,
        retirement,
        social,
        total,
        employeeCumulativeTotal: employeeCumulativeTotal + value,
        overSocialLimit,
        overRetirmentLimit,
        insuranceRetirementBase,
        insuranceSocialBase,
    };
};

// Расчет страховых взносов для АйТи компаний. Код 06
export const calcITtax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
): {
    accident: number;
    medical: number;
    retirement: number;
    social: number;
    total: number;
    employeeCumulativeTotal: number;
    overSocialLimit: number;
    overRetirmentLimit: number;
    insuranceRetirementBase: number;
    insuranceSocialBase: number;
} => {
    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let retirement = 0;
    let social = 0;
    let overSocialLimit = 0;
    let overRetirmentLimit = 0;
    let insuranceRetirementBase = 0;
    let insuranceSocialBase = 0;
    let accident = 0;
    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    const { employeeId } = state.months[table].salary[index];
    let isCivil = false;

    const employeeAccruals: ISalary[] = [];
    for (const month in state.months) {
        const employeeAccrual: ISalary = state.months[month].salary.find(
            (accrual: ISalary) => accrual.employeeId === employeeId
        );
        isCivil = employeeAccrual?.civilContract;
        if (monthCounter === monthNumber) break;

        employeeAccrual && employeeAccruals.push(employeeAccrual);
        monthCounter++;
    }

    employeeCumulativeTotal = employeeAccruals.reduce(
        (accrualSumm, current) => accrualSumm + current.accrued,
        0
    );
    // начисления ЗП с учетом начисления за текущий месяц

    const currentCumulativeAccrual = employeeCumulativeTotal + value;
    // расчет взносов на пенсионное страхование с учетом лимита начисления
    // let residueRetirement = 0;
    if (employeeCumulativeTotal < Limits.retirement) {
        if (currentCumulativeAccrual > Limits.retirement) {
            overRetirmentLimit = currentCumulativeAccrual - Limits.retirement;
            insuranceRetirementBase = value - overRetirmentLimit;
            retirement = insuranceRetirementBase * itRates.retirement;
        } else {
            retirement = value * itRates.retirement;
            insuranceRetirementBase = value;
        }
    } else {
        overRetirmentLimit = value;
    }
    // расчет взносов на социальное страхование с учетом лимита начисления

    if (!isCivil) {
        accident = value * StaticRates.accident;
        if (employeeCumulativeTotal < Limits.social) {
            if (currentCumulativeAccrual > Limits.social) {
                overSocialLimit = currentCumulativeAccrual - Limits.social;
                insuranceSocialBase = value - overSocialLimit;
                social = insuranceSocialBase * itRates.social;
            } else {
                social = value * itRates.social;
                insuranceSocialBase = value;
            }
        } else {
            overSocialLimit = value;
        }
    }
    const medical = value * itRates.medical;
    const total = medical + retirement + social + accident;
    // расчет данных для конкретного сотрудника в конкретном месяце
    return {
        accident,
        medical,
        retirement,
        social,
        total,
        employeeCumulativeTotal: employeeCumulativeTotal + value,
        overSocialLimit,
        overRetirmentLimit,
        insuranceRetirementBase,
        insuranceSocialBase,
    };
};
// Расчет страховых взносов для Малого и среднего бизнеса. Код 20
export const calcBusinessTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
): {
    accident: number;
    medical: number;
    retirement: number;
    social: number;
    total: number;
    employeeCumulativeTotal: number;
    overSocialLimit: number;
    overRetirmentLimit: number;
    insuranceRetirementBase: number;
    insuranceSocialBase: number;
} => {
    const minimalSalary = getMinimalSalary(table);

    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let retirement = 0;
    let social = 0;
    let overSocialLimit = 0;
    let overRetirmentLimit = 0;
    let insuranceRetirementBase = 0;
    let insuranceSocialBase = 0;
    let accident = 0;
    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    const { employeeId } = state.months[table].salary[index];
    let isCivil = false;

    const employeeAccruals: ISalary[] = [];
    for (const month in state.months) {
        const employeeAccrual: ISalary = state.months[month].salary.find(
            (accrual: ISalary) => accrual.employeeId === employeeId
        );
        isCivil = employeeAccrual?.civilContract;
        if (monthCounter === monthNumber) break;
        employeeAccrual && employeeAccruals.push(employeeAccrual);
        monthCounter++;
    }

    employeeCumulativeTotal = employeeAccruals.reduce(
        (accrualSumm, current) => accrualSumm + current.accrued,
        0
    );
    // начисления ЗП с учетом начисления за текущий месяц
    const currentCumulativeAccrual = employeeCumulativeTotal + value;
    // Если начислено меньше МРОТ, то ставка налога в любом случае будет BasicRates
    if (value <= minimalSalary) {
        // расчет взносов на пенсионное страхование с учетом лимита начисления
        if (employeeCumulativeTotal < Limits.retirement) {
            if (currentCumulativeAccrual > Limits.retirement) {
                overRetirmentLimit =
                    currentCumulativeAccrual - Limits.retirement;
                insuranceRetirementBase = value - overRetirmentLimit;
                retirement = insuranceRetirementBase * BasicRates.retirement;
            } else {
                retirement = value * BasicRates.retirement;
            }
        } else {
            overRetirmentLimit = value;
        }
        // расчет взносов на социальное страхование с учетом лимита начисления
        if (!isCivil) {
            accident = value * StaticRates.accident;
            if (employeeCumulativeTotal < Limits.social) {
                if (currentCumulativeAccrual > Limits.social) {
                    overSocialLimit = currentCumulativeAccrual - Limits.social;
                    insuranceSocialBase = value - overSocialLimit;
                    social = insuranceSocialBase * BasicRates.social;
                } else {
                    social = value * BasicRates.social;
                }
            } else {
                overSocialLimit = value;
            }
        }
        const medical = value * BasicRates.medical;
        const total = medical + retirement + social + accident;
        return {
            accident,
            medical,
            retirement,
            social,
            total,
            employeeCumulativeTotal: employeeCumulativeTotal + value,
            overSocialLimit,
            overRetirmentLimit,
            insuranceRetirementBase,
            insuranceSocialBase,
        };
    } else {
        let minRetirement = 0;
        let minSocial = 0;
        if (employeeCumulativeTotal < Limits.retirement) {
            // Если лимит с учетом начислений текущего месяца (currentCumulativeAccrual) превышен, то
            if (currentCumulativeAccrual > Limits.retirement) {
                overRetirmentLimit =
                    currentCumulativeAccrual - Limits.retirement;
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
        if (!isCivil) {
            accident = minimalSalary * StaticRates.accident;
            if (employeeCumulativeTotal < Limits.social) {
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

        const minMedical = minimalSalary * BasicRates.medical;
        const medical = (value - minimalSalary) * BusinessRates.medical;
        const minTotal = minMedical + minRetirement + minSocial + accident;
        const businessTotal = medical + retirement + social;

        return {
            accident,
            medical: minMedical + medical,
            retirement: minRetirement + retirement,
            social: minSocial + social,
            total: minTotal + businessTotal,
            employeeCumulativeTotal: employeeCumulativeTotal + value,
            overSocialLimit,
            overRetirmentLimit,
            insuranceRetirementBase,
            insuranceSocialBase,
        };
    }
};

export const calcTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number,
    rateCode: string
): {
    accident: number;
    medical: number;
    retirement: number;
    social: number;
    total: number;
    employeeCumulativeTotal: number;
    overSocialLimit: number;
    overRetirmentLimit: number;
    insuranceRetirementBase: number;
    insuranceSocialBase: number;
} => {
    switch (rateCode) {
        case "06":
            return calcITtax(state, value, table, index);
        case "20":
            return calcBusinessTax(state, value, table, index);
        default:
            return calcBasicTax(state, value, table, index);
    }
};
