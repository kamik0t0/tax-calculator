import { ISalaries } from "../../exports/interfaces";
import { calcEmployeeCumulative } from "./calculateEmployeeCumulative";
import {
    calcRetirementInsurance,
    calcSocialInsurance,
} from "./insurancesCalculations";
import { BasicRates, Limits, StaticRates } from "../../exports/utils";
import { setIsCivilContract } from "../setIsCivilContract";

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

    const isCivilContract: boolean = setIsCivilContract(
        state.employees,
        employeeId
    );
    // начисления ЗП с учетом начисления за текущий месяц
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
};
