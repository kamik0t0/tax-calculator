import {
    ISalaries,
    ISalary,
    ISalarySummary,
} from "../../../../pages/salary-tax/interfaces/ISalary";
import {
    BasicRates,
    itRates,
    StaticRates,
    BusinessRates,
    RegionMinimalSalary01062022,
    RegionMinimalSalary01012022,
} from "../../../../pages/salary-tax/utils/salaryConsts";
import { Months } from "../../../../pages/salary-tax/utils/months";
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
        return RegionMinimalSalary01012022;
    else return RegionMinimalSalary01062022;
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
const calcBasicTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number
) => {
    const medical = value * BasicRates.medical;
    const retirement = value * BasicRates.retirement;
    const social = value * BasicRates.social;
    const accident = value * StaticRates.accident;
    const insuranceTotal = medical + retirement + social + accident;

    state.months[table].salary[index].insurance.accident = accident;
    state.months[table].salary[index].insurance.medical = medical;
    state.months[table].salary[index].insurance.retirement = retirement;
    state.months[table].salary[index].insurance.social = social;
    state.months[table].salary[index].insurance.total = insuranceTotal;
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
    const medical = value * itRates.medical;
    const retirement = value * itRates.retirement;
    const social = value * itRates.social;
    const accident = value * StaticRates.accident;
    const insuranceTotal = medical + retirement + social + accident;

    state.months[table].salary[index].insurance.accident = accident;
    state.months[table].salary[index].insurance.medical = medical;
    state.months[table].salary[index].insurance.retirement = retirement;
    state.months[table].salary[index].insurance.social = social;
    state.months[table].salary[index].insurance.total = insuranceTotal;
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

    if (value <= minimalSalary) {
        const minMedical = value * BasicRates.medical;
        const minRetirement = value * BasicRates.retirement;
        const minSocial = value * BasicRates.social;
        const minAccident = value * StaticRates.accident;
        const minTotal = minMedical + minRetirement + minSocial + minAccident;

        state.months[table].salary[index].insurance.accident = minAccident;
        state.months[table].salary[index].insurance.medical = minMedical;
        state.months[table].salary[index].insurance.retirement = minRetirement;
        state.months[table].salary[index].insurance.social = minSocial;
        state.months[table].salary[index].insurance.total = minTotal;
        state.months[table].salary[index].accrued = value;
    } else if (value > minimalSalary) {
        const minMedical = minimalSalary * BasicRates.medical;
        const minRetirement = minimalSalary * BasicRates.retirement;
        const minSocial = minimalSalary * BasicRates.social;
        const minAccident = minimalSalary * StaticRates.accident;
        const minTotal = minMedical + minRetirement + minSocial + minAccident;

        const medical = (value - minimalSalary) * BusinessRates.medical;
        const retirement = (value - minimalSalary) * BusinessRates.retirement;
        const social = (value - minimalSalary) * BusinessRates.social;
        const businessTotal = medical + retirement + social;

        state.months[table].salary[index].insurance.accident = minAccident;
        state.months[table].salary[index].insurance.medical =
            minMedical + medical;
        state.months[table].salary[index].insurance.retirement =
            minRetirement + retirement;
        state.months[table].salary[index].insurance.social = minSocial + social;
        state.months[table].salary[index].insurance.total =
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
                    employee.insurance.total =
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
                        employee.insurance.total =
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
                        employee.insurance.total = minTotal + businessTotal;
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
                    employee.insurance.total =
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
        (acc, current) => acc + current.insurance.total,
        0
    );
    summary.payTotal = salary.reduce((acc, current) => acc + current.pay, 0);
    summary.taxTotal = salary.reduce((acc, current) => acc + current.tax, 0);
};
