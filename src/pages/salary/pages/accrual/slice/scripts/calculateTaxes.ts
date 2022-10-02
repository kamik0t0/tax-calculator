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
    const recoupment = calcRecoupment(value);
    const accrued = state.months[table].salary[index].accrued;
    const taxPITBase = accrued - recoupment;
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
} => {
    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let residueRetirement = 0;
    let residueSocial = 0;
    let retirement = 0;
    let social = 0;
    // 1) Найти сотрудника по которому происходят изменения: получить его id
    const { employeeId } = state.months[table].salary[index];

    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    const employeeAccruals: ISalary[] = [];
    for (const month in state.months) {
        if (monthCounter === monthNumber) break;
        // 2) по id сотрудника выбрать начисления в предшествующих месяцах...
        if (employeeId) {
            const employeeAccrual: ISalary = state.months[month].salary.find(
                (accrual: ISalary) => accrual.employeeId === employeeId
            );
            // ... если не undefined
            employeeAccrual && employeeAccruals.push(employeeAccrual);
        }
        monthCounter++;
    }

    // 3) сложить ничисленные суммы
    employeeCumulativeTotal = employeeAccruals.reduce(
        (accrualSumm, current) => accrualSumm + current.accrued,
        0
    );

    // начисления ЗП с учетом начисления за текущий месяц
    const currentAccrued = employeeCumulativeTotal + value;
    // расчет взносов на пенсионное страхование с учетом лимита начисления
    if (employeeCumulativeTotal < Limits.retirement) {
        if (currentAccrued > Limits.retirement) {
            residueRetirement = value - (currentAccrued - Limits.retirement);
            retirement = residueRetirement * BasicRates.retirement;
        } else {
            retirement = value * BasicRates.retirement;
        }
    }
    // расчет взносов на социальное страхование с учетом лимита начисления
    if (employeeCumulativeTotal < Limits.social) {
        if (currentAccrued > Limits.social) {
            residueSocial = value - (currentAccrued - Limits.social);
            social = residueSocial * BasicRates.social;
        } else {
            social = value * BasicRates.social;
        }
    }
    const medical = value * BasicRates.medical;
    const accident = value * StaticRates.accident;
    const total = medical + retirement + social + accident;
    return { accident, medical, retirement, social, total };
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
} => {
    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let residueRetirement = 0;
    let residueSocial = 0;
    let retirement = 0;
    let social = 0;
    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    const { employeeId } = state.months[table].salary[index];

    const employeeAccruals: ISalary[] = [];
    for (const month in state.months) {
        if (monthCounter === monthNumber) break;
        const employeeAccrual: ISalary = state.months[month].salary.find(
            (accrual: ISalary) => accrual.employeeId === employeeId
        );
        employeeAccrual && employeeAccruals.push(employeeAccrual);
        monthCounter++;
    }

    employeeCumulativeTotal = employeeAccruals.reduce(
        (accrualSumm, current) => accrualSumm + current.accrued,
        0
    );
    // начисления ЗП с учетом начисления за текущий месяц
    const currentAccrued = employeeCumulativeTotal + value;
    // расчет взносов на пенсионное страхование с учетом лимита начисления
    if (employeeCumulativeTotal < Limits.retirement) {
        if (currentAccrued > Limits.retirement) {
            residueRetirement = value - (currentAccrued - Limits.retirement);
            retirement = residueRetirement * itRates.retirement;
        } else {
            retirement = value * itRates.retirement;
        }
    }
    // расчет взносов на социальное страхование с учетом лимита начисления
    if (employeeCumulativeTotal < Limits.social) {
        if (currentAccrued > Limits.social) {
            residueSocial = value - (currentAccrued - Limits.social);
            social = residueSocial * itRates.social;
        } else {
            social = value * itRates.social;
        }
    }

    const medical = value * itRates.medical;
    const accident = value * StaticRates.accident;
    const total = medical + retirement + social + accident;

    // calcBasicPIT(state, value, table, index);
    return { accident, medical, retirement, social, total };
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
} => {
    const minimalSalary = getMinimalSalary(table);

    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let residueRetirement = 0;
    let residueSocial = 0;
    let retirement = 0;
    let social = 0;
    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    const { employeeId } = state.months[table].salary[index];

    const employeeAccruals: ISalary[] = [];
    for (const month in state.months) {
        if (monthCounter === monthNumber) break;
        const employeeAccrual: ISalary = state.months[month].salary.find(
            (accrual: ISalary) => accrual.employeeId === employeeId
        );

        employeeAccrual && employeeAccruals.push(employeeAccrual);
        monthCounter++;
    }

    employeeCumulativeTotal = employeeAccruals.reduce(
        (accrualSumm, current) => accrualSumm + current.accrued,
        0
    );
    // начисления ЗП с учетом начисления за текущий месяц
    const currentAccrued = employeeCumulativeTotal + value;
    // Если начислено меньше МРОТ, то ставка налога в любом случае будет BasicRates
    if (value <= minimalSalary) {
        // расчет взносов на пенсионное страхование с учетом лимита начисления
        if (employeeCumulativeTotal < Limits.retirement) {
            if (currentAccrued > Limits.retirement) {
                residueRetirement =
                    value - (currentAccrued - Limits.retirement);
                retirement = residueRetirement * BasicRates.retirement;
            } else {
                retirement = value * BasicRates.retirement;
            }
        }
        // расчет взносов на социальное страхование с учетом лимита начисления
        if (employeeCumulativeTotal < Limits.social) {
            if (currentAccrued > Limits.social) {
                residueSocial = value - (currentAccrued - Limits.social);
                social = residueSocial * BasicRates.social;
            } else {
                social = value * BasicRates.social;
            }
        }
        const medical = value * BasicRates.medical;
        const accident = value * StaticRates.accident;
        const total = medical + retirement + social + accident;
        return { accident, medical, retirement, social, total };
    } else {
        let minRetirement = 0;
        let minSocial = 0;
        if (employeeCumulativeTotal < Limits.retirement) {
            // Если лимит с учетом начислений текущего месяца (currentAccrued) превышен, то
            if (currentAccrued > Limits.retirement) {
                residueRetirement =
                    value - (currentAccrued - Limits.retirement);
                // Остаток до превышения выше мрот:
                // МРОТ * BasicRate, Остальное * BusinessRate,
                if (residueRetirement > minimalSalary) {
                    minRetirement = minimalSalary * BasicRates.retirement;
                    retirement =
                        (residueRetirement - minimalSalary) *
                        BusinessRates.retirement;
                    // Остаток до превышения ниже мрот:
                } else {
                    retirement = minimalSalary * BasicRates.retirement;
                }
                // Если лимит с учетом начислений текущего месяца НЕ превышен, то:
            } else {
                minRetirement = minimalSalary * BasicRates.retirement;
                retirement = (value - minimalSalary) * BusinessRates.retirement;
            }
        }
        if (employeeCumulativeTotal < Limits.social) {
            // Если лимит с учетом начислений текущего месяца (currentAccrued) превышен, то
            if (currentAccrued > Limits.social) {
                residueSocial = value - (currentAccrued - Limits.social);
                // Остаток до превышения выше мрот:
                // МРОТ * BasicRate, Остальное * BusinessRate,
                if (residueSocial > minimalSalary) {
                    minSocial = minimalSalary * BasicRates.social;
                    social =
                        (residueSocial - minimalSalary) * BusinessRates.social;
                    // Остаток до превышения ниже мрот:
                } else {
                    social = minimalSalary * BasicRates.social;
                }
                // Если лимит с учетом начислений текущего месяца НЕ превышен, то:
            } else {
                minSocial = minimalSalary * BasicRates.social;
                social = (value - minimalSalary) * BusinessRates.social;
            }
        }

        const accident = minimalSalary * StaticRates.accident;
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

// пересчитать взносы в текущем месяце месяц
export const recalculateMonth = (state: ISalaries, month: string) => {
    const currentMonthSalary: ISalary[] = state.months[month].salary;

    currentMonthSalary.forEach((accrual, index) => {
        if (accrual.employeeId) {
            let insurance;
            switch (state.rateCode) {
                case "06":
                    insurance = calcITtax(state, accrual.accrued, month, index);
                    break;
                case "20":
                    insurance = calcBusinessTax(
                        state,
                        accrual.accrued,
                        month,
                        index
                    );
                    break;
                default:
                    insurance = calcBasicTax(
                        state,
                        accrual.accrued,
                        month,
                        index
                    );
                    break;
            }
            accrual.insurance.accident = insurance.accident;
            accrual.insurance.medical = insurance.medical;
            accrual.insurance.retirement = insurance.retirement;
            accrual.insurance.social = insurance.social;
            accrual.insuranceTotal = insurance.total;
        }
    });

    return currentMonthSalary;
};
