import { ISalaries } from "../exports/interfaces";
import {
    SalaryBusinessTax,
    SalaryItTax,
    SalaryBasicTax,
} from "../exports/classes";

export const calcTax = (
    state: ISalaries,
    value: number,
    table: string,
    index: number,
    rateCode: string
) => {
    switch (rateCode) {
        case "06":
            return new SalaryItTax(state, value, table, index);
        case "20":
            return new SalaryBusinessTax(state, value, table, index);
        default:
            return new SalaryBasicTax(state, value, table, index);
    }
};
