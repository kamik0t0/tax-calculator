import { ISalaries } from "../../exports/interfaces";
import { calcBasicTax } from "./calculateBasicTax";
import { calcBusinessTax } from "./calculateBusinessTax";
import { calcITtax } from "./calculateItTax";

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
    employeeCumulativePerYear: number;
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
