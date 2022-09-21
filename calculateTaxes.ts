import { ISalaries, ISalary, ISalarySummary } from "../../exports/interfaces";
import {
    BasicRates,
    BusinessRates,
    itRates,
    Months,
    MinimalSalary01012022,
    MinimalSalary01062022,
    StaticRates,
    Limits,
    months,
} from "../../exports/utils";
import { current } from "@reduxjs/toolkit";

// определяем МРОТ в зависимости от периода (поскольку МРОТ может меняться в течение года)

const calcRecoupment = (childrenQtty: number) => {
    if (childrenQtty <= 2) return childrenQtty * 1400;
    else return (childrenQtty - 2) * 3000 + 2800;
};

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

// Перерасчет с учетом вычетов
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
    state.months[table].salary[index].tax = PIT;
    state.months[table].salary[index].childrenQtty = value;
    state.months[table].salary[index].pay = payment;
};

// Базовый расчет НДФЛ
const calcBasicPIT = (
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
    state.months[table].salary[index].tax = PIT;
    state.months[table].salary[index].pay = payment;
};

// Расчет страховых взносов по базовой ставке. Код 01
export const calcBasicInsurance = (value: number) => {
    const medical = value * BasicRates.medical;
    const retirement = value * BasicRates.retirement;
    const social = value * BasicRates.social;
    const accident = value * StaticRates.accident;
    const total = medical + retirement + social + accident;
    return { accident, medical, retirement, social, total };
};
// Расчет страховых взносов для АйТи компаний. Код 06
export const calcITinsurance = (value: number) => {
    const medical = value * itRates.medical;
    const retirement = value * itRates.retirement;
    const social = value * itRates.social;
    const accident = value * StaticRates.accident;
    const total = medical + retirement + social + accident;
    return { accident, medical, retirement, social, total };
};
// Расчет страховых взносов для Малого и среднего бизнеса. Код 20
export const calcBusinessInsurance = (value: number, table: string) => {
    const minimalSalary = getMinimalSalary(table);

    if (value <= minimalSalary) {
        const medical = value * BasicRates.medical;
        const retirement = value * BasicRates.retirement;
        const social = value * BasicRates.social;
        const accident = value * StaticRates.accident;
        const total = medical + retirement + social + accident;
        return {
            accident,
            medical,
            retirement,
            social,
            total,
        };
    } else if (value > minimalSalary) {
        const accident = minimalSalary * StaticRates.accident;

        const minMedical = minimalSalary * BasicRates.medical;
        const minRetirement = minimalSalary * BasicRates.retirement;
        const minSocial = minimalSalary * BasicRates.social;

        const medical =
            (value - minimalSalary) * BusinessRates.medical + minMedical;
        const retirement =
            (value - minimalSalary) * BusinessRates.retirement + minRetirement;
        const social =
            (value - minimalSalary) * BusinessRates.social + minSocial;
        const total = medical + retirement + social;

        return { accident, medical, retirement, social, total };
    }
};
const calcBasicTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let residueRetirement = 0;
    let residueSocial = 0;
    let retirement = 0;
    let social = 0;
    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    for (const month in state.months) {
        if (monthCounter === monthNumber) break;
        if (state.months[month].salary[index]?.accrued) {
            employeeCumulativeTotal +=
                state.months[month].salary[index].accrued;
        }
        monthCounter++;
    }
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
    const insuranceTotal = medical + retirement + social + accident;

    state.months[table].salary[index].insurance.accident = accident;
    state.months[table].salary[index].insurance.medical = medical;
    state.months[table].salary[index].insurance.retirement = retirement;
    state.months[table].salary[index].insurance.social = social;
    state.months[table].salary[index].insuranceTotal = insuranceTotal;
    state.months[table].salary[index].accrued = value;

    calcBasicPIT(state, value, table, index);
};

// Расчет страховых взносов для АйТи компаний. Код 06
const calcITtax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
    // таблица - имя месяца
    const monthNumber = months.findIndex((month) => month === table);
    let employeeCumulativeTotal: number = 0;
    let monthCounter: number = 0;
    let residueRetirement = 0;
    let residueSocial = 0;
    let retirement = 0;
    let social = 0;
    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    for (const month in state.months) {
        if (monthCounter === monthNumber) break;
        if (state.months[month].salary[index]?.accrued) {
            employeeCumulativeTotal +=
                state.months[month].salary[index].accrued;
        }
        monthCounter++;
    }
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
    const insuranceTotal = medical + retirement + social + accident;

    state.months[table].salary[index].insurance.accident = accident;
    state.months[table].salary[index].insurance.medical = medical;
    state.months[table].salary[index].insurance.retirement = retirement;
    state.months[table].salary[index].insurance.social = social;
    state.months[table].salary[index].insuranceTotal = insuranceTotal;
    state.months[table].salary[index].accrued = value;

    calcBasicPIT(state, value, table, index);
};
// Расчет страховых взносов для Малого и среднего бизнеса. Код 20
const calcBusinessTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
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
    for (const month in state.months) {
        if (monthCounter === monthNumber) break;
        if (state.months[month].salary[index]?.accrued) {
            employeeCumulativeTotal +=
                state.months[month].salary[index].accrued;
        }
        monthCounter++;
    }
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

        state.months[table].salary[index].insurance.accident = accident;
        state.months[table].salary[index].insurance.medical = medical;
        state.months[table].salary[index].insurance.retirement = retirement;
        state.months[table].salary[index].insurance.social = social;
        state.months[table].salary[index].insuranceTotal = total;
        state.months[table].salary[index].accrued = value;
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
        console.log(
            accident,
            medical,
            minMedical,
            retirement,
            minRetirement,
            social,
            minSocial,
            value
        );

        state.months[table].salary[index].insurance.accident = accident;
        state.months[table].salary[index].insurance.medical =
            minMedical + medical;
        state.months[table].salary[index].insurance.retirement =
            minRetirement + retirement;
        state.months[table].salary[index].insurance.social = minSocial + social;
        state.months[table].salary[index].insuranceTotal =
            minTotal + businessTotal;
        state.months[table].salary[index].accrued = value;
    }

    calcBasicPIT(state, value, table, index);
};

export const calcTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number,
    rateCode: string
) => {
    switch (rateCode) {
        case "06":
            calcITtax(state, value, table, index);
            break;
        case "20":
            calcBusinessTax(state, value, table, index);
            break;
        default:
            calcBasicTax(state, value, table, index);
            break;
    }
};
// перерасчет всех взносов при изменении кода тарифа
export const calcGlobalTax = (state: ISalaries, rateCode: string) => {
    for (const table in state.months) {
        const salary: ISalary[] = state.months[table].salary;
        const minimalSalary = getMinimalSalary(table);
        switch (rateCode) {
            case "06":
                salary.forEach((employee) => {
                    const accrued = employee.accrued;
                    const accident = accrued * StaticRates.accident;
                    const medical = accrued * itRates.medical;
                    const retirement = accrued * itRates.retirement;
                    const social = accrued * itRates.social;

                    employee.insurance.accident = accident;
                    employee.insurance.medical = medical;
                    employee.insurance.retirement = retirement;
                    employee.insurance.social = social;
                    employee.insuranceTotal =
                        accident + medical + retirement + social;
                });

                state.months[table].salary = salary;
                break;
            case "20":
                salary.forEach((employee) => {
                    const accrued = employee.accrued;
                    if (accrued <= minimalSalary) {
                        const accident = accrued * StaticRates.accident;
                        const medical = accrued * BasicRates.medical;
                        const retirement = accrued * BasicRates.retirement;
                        const social = accrued * BasicRates.social;

                        employee.insurance.accident = accident;
                        employee.insurance.medical = medical;
                        employee.insurance.retirement = retirement;
                        employee.insurance.social = social;
                        employee.insuranceTotal =
                            accident + medical + retirement + social;
                    } else {
                        const minMedical = minimalSalary * BasicRates.medical;
                        const minRetirement =
                            minimalSalary * BasicRates.retirement;
                        const minSocial = minimalSalary * BasicRates.social;
                        const minAccident =
                            minimalSalary * StaticRates.accident;
                        const minTotal =
                            minMedical +
                            minRetirement +
                            minSocial +
                            minAccident;

                        const medical =
                            (accrued - minimalSalary) * BusinessRates.medical;
                        const retirement =
                            (accrued - minimalSalary) *
                            BusinessRates.retirement;
                        const social =
                            (accrued - minimalSalary) * BusinessRates.social;
                        const businessTotal = medical + retirement + social;

                        employee.insurance.accident = minAccident;
                        employee.insurance.medical = medical;
                        employee.insurance.retirement = retirement;
                        employee.insurance.social = social;
                        employee.insuranceTotal = minTotal + businessTotal;
                    }
                });
                state.months[table].salary = salary;
                break;

            default:
                salary.forEach((employee) => {
                    const accrued = employee.accrued;
                    const accident = accrued * StaticRates.accident;
                    const medical = accrued * BasicRates.medical;
                    const retirement = accrued * BasicRates.retirement;
                    const social = accrued * BasicRates.social;

                    employee.insurance.accident = accident;
                    employee.insurance.medical = medical;
                    employee.insurance.retirement = retirement;
                    employee.insurance.social = social;
                    employee.insuranceTotal =
                        accident + medical + retirement + social;
                });

                state.months[table].salary = salary;

                break;
        }
    }
};

export const calcSalarySummary = (
    summary: ISalarySummary,
    salary: ISalary[]
) => {
    summary.accruedTotal = salary.reduce(
        (acc, current) => acc + current.accrued,
        0
    );
    summary.insuranceTotal = salary.reduce(
        (acc, current) => acc + current.insuranceTotal,
        0
    );

    summary.payTotal = salary.reduce((acc, current) => acc + current.pay, 0);
    summary.taxTotal = salary.reduce((acc, current) => acc + current.tax, 0);
};
