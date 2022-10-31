import { ITax } from "../exports/types";
import { FixInsuranceValues } from "../../../pages/salary/pages/accrual/exports/utils";

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
    },

    taxIncomeIE: { tax: 0, total: 0 },
    burdenIncomeIE: 0,

    taxIncomeLLC: { tax: 0, total: 0 },
    burdenIncomeLLC: 0,

    taxIncomeExpensesIE: { tax: 0, total: 0, minimal: 0 },
    burdenIncomeExpensesIE: 0,

    taxIncomeExpensesLLC: { tax: 0, total: 0, minimal: 0 },
    burdenIncomeExpensesLLC: 0,

    taxBasicIE: {
        VAT: {
            accrualVAT: 0,
            recoupmentVAT: 0,
            vat: 0,
        },
        PIT: {
            taxableIncome: 0,
            recoupment: 0,
            pit: 0,
        },
        total: 0,
    },
    burdenBasicIE: 0,

    taxBasicLLC: {
        VAT: {
            accrualVAT: 0,
            recoupmentVAT: 0,
            vat: 0,
        },
        incomeTax: {
            taxableIncome: 0,
            recoupment: 0,
            incomeTax: 0,
        },
        total: 0,
    },
    burdenBasicLLC: 0,
};
