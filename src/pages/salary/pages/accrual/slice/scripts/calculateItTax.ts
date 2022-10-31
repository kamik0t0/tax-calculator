import { ISalaries } from "../../exports/interfaces";
import { itRates, Limits, StaticRates } from "../../exports/utils";
import { calcEmployeeCumulative } from "./calculateEmployeeCumulative";
import {
    calcRetirementInsurance,
    calcSocialInsurance,
} from "./insurancesCalculations";
import { setIsCivilContract } from "./setIsCivilContract";

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
    employeeCumulativePerYear: number;
    overSocialLimit: number;
    overRetirmentLimit: number;
    insuranceRetirementBase: number;
    insuranceSocialBase: number;
} => {
    const { employeeId } = state.months[table].salary[index];
    const {
        employeeCumulativePerYear,
        currentCumulativeAccrual,
    }: { employeeCumulativePerYear: number; currentCumulativeAccrual: number } =
        calcEmployeeCumulative(table, state, employeeId, value);

    const isCivilContract: boolean = setIsCivilContract(state, employeeId);
    // начисления ЗП с учетом начисления за текущий месяц
    const { overRetirmentLimit, retirement, insuranceRetirementBase } =
        calcRetirementInsurance(
            employeeCumulativePerYear,
            value,
            itRates.retirement,
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
            itRates.social
        );

    const medical = value * itRates.medical;
    const total = medical + retirement + social + accident;
    // расчет данных для конкретного сотрудника в конкретном месяце
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
};
