import { ITax } from "../exports/types";
import { FixInsuranceValues } from "../exports/utils";

export const initialState: ITax = {
    income: 0,
    expenses: 0,
    salary: 0,

    insurance: {
        social: 0,
        medical: 0,
        retirement: 0,
        accident: 0,
    },
    insuranceIE: {
        fixMedical: FixInsuranceValues.medical,
        fixRetirement: FixInsuranceValues.retirement,
        floatInsurance: 0,
        floatInsuranceBasicTax: 0,
    },

    taxIncomeIE: { tax: 0, total: 0, recoupment: 0 },
    burdenIncomeIE: 0,

    taxIncomeLLC: { tax: 0, total: 0, recoupment: 0 },
    burdenIncomeLLC: 0,

    taxIncomeExpensesIE: { tax: 0, total: 0, minimal: 0, totalCost: 0 },
    burdenIncomeExpensesIE: 0,

    taxIncomeExpensesLLC: { tax: 0, total: 0, minimal: 0, totalCost: 0 },
    burdenIncomeExpensesLLC: 0,

    taxBasicIE: {
        NDS: {
            accrualNDS: 0,
            recoupmentNDS: 0,
            tax: 0,
        },
        NDFL: {
            taxableIncome: 0,
            recoupment: 0,
            tax: 0,
        },
        total: 0,
    },
    burdenBasicIE: 0,

    taxBasicLLC: {
        NDS: {
            accrualNDS: 0,
            recoupmentNDS: 0,
            tax: 0,
        },
        profitTax: {
            taxableIncome: 0,
            recoupment: 0,
            tax: 0,
        },
        total: 0,
    },
    burdenBasicLLC: 0,
    rates: {
        incomeRate: 0.06,
        expensesRate: 0.15,
        LLCIncomeRate: 0.17,
    },
};
