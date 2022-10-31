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
    };

    taxIncomeIE: { tax: number; total: number };
    burdenIncomeIE: number;

    taxIncomeLLC: { tax: number; total: number };
    burdenIncomeLLC: number;

    taxIncomeExpensesIE: { tax: number; total: number; minimal: number };
    burdenIncomeExpensesIE: number;

    taxIncomeExpensesLLC: { tax: number; total: number; minimal: number };
    burdenIncomeExpensesLLC: number;

    taxBasicIE: {
        VAT: {
            accrualVAT: number;
            recoupmentVAT: number;
            vat: number;
        };
        PIT: {
            taxableIncome: number;
            recoupment: number;
            pit: number;
        };
        total: number;
    };
    burdenBasicIE: number;

    taxBasicLLC: {
        VAT: {
            accrualVAT: number;
            recoupmentVAT: number;
            vat: number;
        };
        incomeTax: {
            taxableIncome: number;
            recoupment: number;
            incomeTax: number;
        };
        total: number;
    };
    burdenBasicLLC: number;
}

interface calcData {
    income?: number;
    salary?: number;
    expenses?: number;
    retirementFixInsurance?: number;
    medicalFixInsurance?: number;
    salaryTaxRate?: number;
}
