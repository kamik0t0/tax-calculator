import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { ITax } from "../exports/types";
import {
    BasicRates,
    StaticRates,
    SalaryInsuranceRate,
    FixInsuranceValues,
} from "../exports/utils";
import {
    TaxCalcIE,
    TaxCalcIEExpenses,
    TaxCalcLLCIncome,
    TaxCalcIEIncome,
    TaxCalcLLCExpenses,
    TaxCalcIEBasic,
    TaxCalcLLCBasic,
} from "../exports/classes";

export const setTaxIncomeReducer: CaseReducer<ITax, PayloadAction<number>> = (
    state,
    action
) => {
    const income = action.payload;
    state.income = income;
};
export const setTaxExpansesReducer: CaseReducer<ITax, PayloadAction<number>> = (
    state,
    action
) => {
    const expenses = action.payload;
    state.expenses = expenses;
};
export const setTaxSalaryReducer: CaseReducer<ITax, PayloadAction<number>> = (
    state,
    action
) => {
    const salary = action.payload;
    state.salary = salary;
};
export const setIncomeRateReducer: CaseReducer<ITax, PayloadAction<number>> = (
    state,
    action
) => {
    const incomeRate = action.payload;
    state.rates.incomeRate = incomeRate;
};
export const setExpensesRateReducer: CaseReducer<
    ITax,
    PayloadAction<number>
> = (state, action) => {
    const expensesRate = action.payload;
    state.rates.expensesRate = expensesRate;
};
export const setIncomeTaxRateReducer: CaseReducer<
    ITax,
    PayloadAction<number>
> = (state, action) => {
    const incomeTaxRate = action.payload;
    state.rates.LLCIncomeRate = incomeTaxRate;
};

type AvailableDataType = {
    expenses: number;
    salary: number;
};

export const fillWithAvailableDataReducer = () => ({
    reducer(
        state: ITax,
        action: PayloadAction<number, string, AvailableDataType>
    ) {
        const income = action.payload;
        const { expenses, salary } = action.meta;

        state.income = income;
        state.expenses = expenses;
        state.salary = salary;
    },
    prepare(payload: number, expenses: number, salary: number) {
        return { payload, meta: { expenses, salary } };
    },
});

export const calculateTaxesReducer: CaseReducer<ITax> = (state) => {
    // Значения вводимые пользователем
    const income = state.income;
    const expenses = state.expenses;
    const salary = state.salary;
    // Страховые взносы с ФОТ
    state.insurance.social = salary * BasicRates.social;
    state.insurance.medical = salary * BasicRates.medical;
    state.insurance.retirement = salary * BasicRates.retirement;
    state.insurance.accident = salary * StaticRates.accident;
    // Расчет взносов 1% свыше 300 тыс с суммы дохода для ИП УСН доходы
    state.insuranceIE.floatInsurance = TaxCalcIE.floatInsurance(income);

    // Доходы ИП --------------------------------------------------------------
    const calcIncomeIE = new TaxCalcIEIncome(
        SalaryInsuranceRate,
        FixInsuranceValues.medical,
        FixInsuranceValues.retirement
    );
    //  Всего налогов для ИП УСН доходы
    const [totalIEIncome, burdenIEIncome, USNIEIncome] =
        TaxCalcIEIncome.totalTax({
            rate: state.rates.incomeRate,
            income,
            salary,
            salaryTaxRate: calcIncomeIE.salaryTaxRate,
            medicalFixInsurance: calcIncomeIE.medicalFixInsurance,
            retirementFixInsurance: calcIncomeIE.retirementFixInsurance,
        });

    // Итого налогов
    state.taxIncomeIE.total = totalIEIncome;
    // Доля налогов в доходах для ИП УСН доходы
    state.burdenIncomeIE = burdenIEIncome;
    // УСН для ИП УСН доходы
    state.taxIncomeIE.tax = USNIEIncome;

    // Доходы ООО -------------------------------------------------------------
    const calcIncomeLLC = new TaxCalcLLCIncome(SalaryInsuranceRate);

    const [totalLLCIncome, burdenLLCIncome, usnLLCIncome] =
        TaxCalcLLCIncome.totalTax({
            rate: state.rates.incomeRate,
            income,
            salary,
            salaryTaxRate: calcIncomeLLC.salaryTaxRate,
        });
    // Итого налоги
    state.taxIncomeLLC.total = totalLLCIncome;
    // Доля налогов в доходах для ООО УСН доходы
    state.burdenIncomeLLC = burdenLLCIncome;
    // УСН для ООО УСН доходы
    state.taxIncomeLLC.tax = usnLLCIncome;

    // Доходы минус расходы ИП ------------------------------------------------
    const calcIncomeExpensesIE = new TaxCalcIEExpenses(
        SalaryInsuranceRate,
        FixInsuranceValues.medical,
        FixInsuranceValues.retirement
    );

    const [totalIEExpenses, burdenIEExpenses, usnIEExpenses, minimalIE] =
        TaxCalcIEExpenses.totalTax({
            rate: state.rates.expensesRate,
            income,
            salary,
            expenses,
            retirementFixInsurance: calcIncomeExpensesIE.retirementFixInsurance,
            medicalFixInsurance: calcIncomeExpensesIE.medicalFixInsurance,
            salaryTaxRate: calcIncomeExpensesIE.salaryTaxRate,
        });

    //  Всего налогов для ИП УСН доходы-расходы
    state.taxIncomeExpensesIE.total = totalIEExpenses;
    // Налоговая нагрузка
    state.burdenIncomeExpensesIE = burdenIEExpenses;
    // УСН для ИП УСН доходы-расходы
    state.taxIncomeExpensesIE.tax = usnIEExpenses;
    // УСН минимальный 1%
    state.taxIncomeExpensesIE.minimal = minimalIE;

    // Доходы минус расходы ООО -----------------------------------------------
    const calcIncomeExpensesLLC = new TaxCalcLLCExpenses(SalaryInsuranceRate);

    const [totalLLCExpenses, burdenLLCExpenses, usnLLCExpenses, minimalLLC] =
        TaxCalcLLCExpenses.totalTax({
            rate: state.rates.expensesRate,
            income,
            salary,
            expenses,
            salaryTaxRate: calcIncomeExpensesLLC.salaryTaxRate,
        });
    //  Всего налогов для ИП УСН доходы-расходы
    state.taxIncomeExpensesLLC.total = totalLLCExpenses;
    // Налоговая нагрузка
    state.burdenIncomeExpensesLLC = burdenLLCExpenses;
    // УСН для ИП УСН доходы-расходы
    state.taxIncomeExpensesLLC.tax = usnLLCExpenses;
    // УСН минимальный 1%
    state.taxIncomeExpensesLLC.minimal = minimalLLC;

    // Общий ИП ---------------------------------------------------------------
    const calcCommonIE = new TaxCalcIEBasic(
        SalaryInsuranceRate,
        FixInsuranceValues.medical,
        FixInsuranceValues.retirement
    );

    const {
        vatAccruedCommonIE,
        vatRecoupmentCommonIE,
        vatFinalCommonIE,
        taxIncomeCommonIE,
        taxRecoupmentCommonIE,
        pitCommonIE,
        totalCommonIE,
        burdenCommonIE,
    } = TaxCalcIEBasic.totalTax({
        rate: 0.13,
        income,
        salary,
        expenses,
        retirementFixInsurance: calcCommonIE.retirementFixInsurance,
        medicalFixInsurance: calcCommonIE.medicalFixInsurance,
        salaryTaxRate: calcCommonIE.salaryTaxRate,
    });

    state.taxBasicIE.VAT.accrualVAT = vatAccruedCommonIE;
    state.taxBasicIE.VAT.recoupmentVAT = vatRecoupmentCommonIE;
    state.taxBasicIE.VAT.vat = vatFinalCommonIE;
    state.taxBasicIE.PIT.taxableIncome = taxIncomeCommonIE;
    state.taxBasicIE.PIT.recoupment = taxRecoupmentCommonIE;
    state.taxBasicIE.PIT.pit = pitCommonIE;
    state.taxBasicIE.total = totalCommonIE;
    state.burdenBasicIE = burdenCommonIE;

    // Общий ООО --------------------------------------------------------------
    const calcCommonLLC = new TaxCalcLLCBasic(SalaryInsuranceRate);

    const {
        vatAccruedCommonLLC,
        vatRecoupmentCommonLLC,
        vatFinalCommonLLC,
        taxIncomeCommonLLC,
        taxRecoupmentCommonLLC,
        pitCommonLLC,
        totalCommonLLC,
        burdenCommonLLC,
    } = TaxCalcLLCBasic.totalTax({
        rate: state.rates.LLCIncomeRate,
        income,
        salary,
        expenses,
        salaryTaxRate: calcCommonLLC.salaryTaxRate,
    });

    state.taxBasicLLC.VAT.accrualVAT = vatAccruedCommonLLC;
    state.taxBasicLLC.VAT.recoupmentVAT = vatRecoupmentCommonLLC;
    state.taxBasicLLC.VAT.vat = vatFinalCommonLLC;
    state.taxBasicLLC.incomeTax.taxableIncome = taxIncomeCommonLLC;
    state.taxBasicLLC.incomeTax.recoupment = taxRecoupmentCommonLLC;
    state.taxBasicIE.PIT.pit = pitCommonLLC;
    state.taxBasicLLC.total = totalCommonLLC;
    state.burdenBasicLLC = burdenCommonLLC;
};
