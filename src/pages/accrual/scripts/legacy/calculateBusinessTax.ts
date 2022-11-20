import { ISalaries } from "../../exports/interfaces";
import { getMinimalSalary, setIsCivilContract } from "../../exports/scripts";
import {
    calcRetirementInsurance,
    calcRetirementMoreThenMinimal,
    calcSocialInsurance,
    calcSocialMoreThenMinimal,
} from "./insurancesCalculations";
import { calcEmployeeCumulative } from "./calculateEmployeeCumulative";
import {
    BasicRates,
    BusinessRates,
    Limits,
    StaticRates,
} from "../../exports/utils";

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
    employeeCumulativePerYear: number;
    overSocialLimit: number;
    overRetirmentLimit: number;
    insuranceRetirementBase: number;
    insuranceSocialBase: number;
} => {
    const minimalSalary = getMinimalSalary(table);

    const { employeeId } = state.months[table].salary[index];

    // начисления ЗП с учетом начисления за текущий месяц
    const {
        employeeCumulativePerYear,
        currentCumulativeAccrual,
    }: { employeeCumulativePerYear: number; currentCumulativeAccrual: number } =
        calcEmployeeCumulative(table, state, employeeId, value);
    // Если начислено меньше МРОТ, то ставка налога в любом случае будет BasicRates
    const isCivilContract: boolean = setIsCivilContract(
        state.employees,
        employeeId
    );

    const accident = 0;

    if (value <= minimalSalary) {
        const { overRetirmentLimit, retirement, insuranceRetirementBase } =
            calcRetirementInsurance(
                employeeCumulativePerYear,
                value,
                BasicRates.retirement,
                Limits.retirement,
                currentCumulativeAccrual
            );
        // расчет взносов на социальное страхование с учетом лимита начисления
        const { social, accident, overSocialLimit, insuranceSocialBase } =
            calcSocialInsurance(
                isCivilContract,
                value,
                employeeCumulativePerYear,
                currentCumulativeAccrual,
                StaticRates.accident,
                Limits.social,
                BasicRates.social
            );
        const medical = value * BasicRates.medical;
        const total = medical + retirement + social + accident;
        return {
            accident,
            medical,
            retirement,
            social,
            total,
            employeeCumulativePerYear: employeeCumulativePerYear + value,
            overSocialLimit,
            overRetirmentLimit,
            insuranceRetirementBase,
            insuranceSocialBase,
        };
    } else {
        const minSocial = 0;
        const minRetirement = 0;
        const { retirement, overRetirmentLimit, insuranceRetirementBase } =
            calcRetirementMoreThenMinimal(
                employeeCumulativePerYear,
                currentCumulativeAccrual,
                value,
                minimalSalary
            );

        const { social, overSocialLimit, insuranceSocialBase } =
            calcSocialMoreThenMinimal(
                isCivilContract,
                accident,
                minimalSalary,
                employeeCumulativePerYear,
                currentCumulativeAccrual,
                value,
                minSocial
            );

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
            employeeCumulativePerYear: employeeCumulativePerYear + value,
            overSocialLimit,
            overRetirmentLimit,
            insuranceRetirementBase,
            insuranceSocialBase,
        };
    }
};
