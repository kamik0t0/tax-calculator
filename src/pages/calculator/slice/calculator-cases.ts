import { CaseReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { IEBasic } from "../classes/IEBasic";
import { LLCBasic } from "../classes/LLCBasic";
import { LLCExpenses } from "../classes/LLCExpenses";
import { LLCIncome } from "../classes/LLCIncome";
import { IEExpenses, IEIncome, TaxCalc } from "../exports/classes";
import { ITax } from "../exports/types";

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
    const salaryCommonTaxes = new TaxCalc(income, salary);
    // Страховые взносы с ФОТ
    state.insurance.social = salaryCommonTaxes.social;
    state.insurance.medical = salaryCommonTaxes.medical;
    state.insurance.retirement = salaryCommonTaxes.retirement;
    state.insurance.accident = salaryCommonTaxes.accident;

    // Доходы ИП --------------------------------------------------------------
    const calcIEData = new IEIncome(income, salary, state.rates.incomeRate);
    // Расчет взносов 1% свыше 300 тыс с суммы дохода для ИП УСН доходы
    state.insuranceIE.floatInsurance = calcIEData.floatInsurance;
    // Итого налогов
    state.taxIncomeIE.total = calcIEData.totalTax;
    // Доля налогов в доходах для ИП УСН доходы
    state.burdenIncomeIE = calcIEData.burden(calcIEData.totalTax);
    // УСН для ИП УСН доходы
    state.taxIncomeIE.tax = calcIEData.usn;
    // Вычет
    state.taxIncomeIE.recoupment = calcIEData.recoupment;

    // Доходы ООО -------------------------------------------------------------
    const calcIncomeLLC = new LLCIncome(income, salary, state.rates.incomeRate);
    // Итого налоги
    state.taxIncomeLLC.total = calcIncomeLLC.totalTax;
    // Доля налогов в доходах для ООО УСН доходы
    state.burdenIncomeLLC = calcIncomeLLC.burden(calcIncomeLLC.totalTax);
    // УСН для ООО УСН доходы
    state.taxIncomeLLC.tax = calcIncomeLLC.usn;
    // Вычет
    state.taxIncomeLLC.recoupment = calcIncomeLLC.recoupment;

    // Доходы минус расходы ИП ------------------------------------------------
    const calcExpensesIE = new IEExpenses(
        income,
        expenses,
        salary,
        state.rates.expensesRate
    );
    // Всего налогов для ИП УСН доходы-расходы
    state.taxIncomeExpensesIE.total = calcExpensesIE.totalTax;
    // Налоговая нагрузка
    state.burdenIncomeExpensesIE = calcExpensesIE.burden(
        calcExpensesIE.ieExpenses.totalTax
    );
    // УСН для ИП УСН доходы-расходы
    state.taxIncomeExpensesIE.tax = calcExpensesIE.usn;
    // УСН минимальный 1%
    state.taxIncomeExpensesIE.minimal = calcExpensesIE.minimal;
    // Всего расходов
    state.taxIncomeExpensesIE.totalCost = calcExpensesIE.totalCost;

    // Доходы минус расходы ООО -----------------------------------------------
    const calcExpensesLLC = new LLCExpenses(
        income,
        expenses,
        salary,
        state.rates.expensesRate
    );
    //  Всего налогов для ИП УСН доходы-расходы
    state.taxIncomeExpensesLLC.total = calcExpensesLLC.totalTax;
    // Налоговая нагрузка
    state.burdenIncomeExpensesLLC = calcExpensesLLC.burden(
        calcExpensesLLC.totalTax
    );
    // УСН для ИП УСН доходы-расходы
    state.taxIncomeExpensesLLC.tax = calcExpensesLLC.usn;
    // УСН минимальный 1%
    state.taxIncomeExpensesLLC.minimal = calcExpensesLLC.minimal;
    // Всего расходов
    state.taxIncomeExpensesLLC.totalCost = calcExpensesLLC.totalCost;

    // Общий ИП ---------------------------------------------------------------
    const calcCommonIE = new IEBasic(income, expenses, salary);
    // НДС с продаж
    state.taxBasicIE.NDS.accrualNDS = calcCommonIE.NDSAccrued;
    // НДС с покупок
    state.taxBasicIE.NDS.recoupmentNDS = calcCommonIE.NDSRecoupment;
    // НДС к уплате
    state.taxBasicIE.NDS.tax = calcCommonIE.NDSTax;
    // База по НП
    state.taxBasicIE.NDFL.taxableIncome = calcCommonIE.NDFLIncome;
    // Расходы уменьшающие базу по НП
    state.taxBasicIE.NDFL.recoupment = calcCommonIE.NDFLRecoupment;
    // Налог на прибыль
    state.taxBasicIE.NDFL.tax = calcCommonIE.NDFL;
    // Итого налогов
    state.taxBasicIE.total = calcCommonIE.totalTax;
    // Налоговая нагрузка
    state.burdenBasicIE = calcCommonIE.burden(calcCommonIE.totalTax);
    // Взносы с доходов
    state.insuranceIE.floatInsuranceBasicTax = calcCommonIE.floatInsurance;

    // Общий ООО --------------------------------------------------------------
    const calcCommonLLC = new LLCBasic(
        income,
        expenses,
        salary,
        state.rates.LLCIncomeRate
    );
    // НДС с продаж
    state.taxBasicLLC.NDS.accrualNDS = calcCommonLLC.NDSAccrued;
    // НДС с покупок
    state.taxBasicLLC.NDS.recoupmentNDS = calcCommonLLC.NDSRecoupment;
    // НДС к уплате
    state.taxBasicLLC.NDS.tax = calcCommonLLC.NDSTax;
    // База по НП
    state.taxBasicLLC.profitTax.taxableIncome = calcCommonLLC.LLCIncome;
    // Расходы уменьшающие базу по НП
    state.taxBasicLLC.profitTax.recoupment = calcCommonLLC.LLCRecoupment;
    // Налог на прибыль
    state.taxBasicLLC.profitTax.tax = calcCommonLLC.LLCIncomeTax;
    // Итого налогов
    state.taxBasicLLC.total = calcCommonLLC.totalTax;
    // Налоговая нагрузка
    state.burdenBasicLLC = calcCommonLLC.burden(calcCommonLLC.totalTax);
};
