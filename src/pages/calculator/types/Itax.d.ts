export interface ITax {
    income: number;
    expenses: number;
    salary: number;

    insurance: {
        social: number;
        medical: number;
        retirement: number;
        accident: number;
    };
    insuranceIE: {
        fixMedical: number;
        fixRetirement: number;
        floatInsurance: number;
        floatInsuranceBasicTax: number;
    };

    taxIncomeIE: { tax: number; total: number; recoupment: number };
    burdenIncomeIE: number;

    taxIncomeLLC: { tax: number; total: number; recoupment: number };
    burdenIncomeLLC: number;

    taxIncomeExpensesIE: {
        tax: number;
        total: number;
        minimal: number;
        totalCost: number;
    };
    burdenIncomeExpensesIE: number;

    taxIncomeExpensesLLC: {
        tax: number;
        total: number;
        minimal: number;
        totalCost: number;
    };
    burdenIncomeExpensesLLC: number;

    taxBasicIE: {
        NDS: {
            accrualNDS: number;
            recoupmentNDS: number;
            tax: number;
        };
        NDFL: {
            taxableIncome: number;
            recoupment: number;
            tax: number;
        };
        total: number;
    };
    burdenBasicIE: number;

    taxBasicLLC: {
        NDS: {
            accrualNDS: number;
            recoupmentNDS: number;
            tax: number;
        };
        profitTax: {
            taxableIncome: number;
            recoupment: number;
            tax: number;
        };
        total: number;
    };
    burdenBasicLLC: number;
    rates: {
        incomeRate: number;
        expensesRate: number;
        LLCIncomeRate: number;
    };
}

interface calcData {
    rate: number;
    income?: number;
    salary?: number;
    expenses?: number;
    retirementFixInsurance?: number;
    medicalFixInsurance?: number;
    salaryTaxRate?: number;
}
