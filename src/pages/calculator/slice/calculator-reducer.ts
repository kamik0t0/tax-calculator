import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./calculator-initial";
import {
    setTaxIncomeReducer,
    setTaxExpansesReducer,
    setTaxSalaryReducer,
    calculateTaxesReducer,
    fillWithAvailableDataReducer,
    setIncomeRateReducer,
    setExpensesRateReducer,
    setIncomeTaxRateReducer,
} from "./calculator-cases";

export const calcTaxSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setTaxIncome: setTaxIncomeReducer,
        setTaxExpanses: setTaxExpansesReducer,
        setTaxSalary: setTaxSalaryReducer,
        calculateTaxes: calculateTaxesReducer,
        setIncomeRate: setIncomeRateReducer,
        setExpensesRate: setExpensesRateReducer,
        setIncomeTaxRate: setIncomeTaxRateReducer,
        fillWithAvailableData: fillWithAvailableDataReducer(),
    },
});

export const {
    setTaxIncome,
    setTaxExpanses,
    setTaxSalary,
    calculateTaxes,
    fillWithAvailableData,
    setIncomeRate,
    setExpensesRate,
    setIncomeTaxRate,
} = calcTaxSlice.actions;

export const { reducer } = calcTaxSlice;
