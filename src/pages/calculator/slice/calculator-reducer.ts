import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./calculator-initial";
import {
    setTaxIncomeReducer,
    setTaxExpansesReducer,
    setTaxSalaryReducer,
    calculateTaxesReducer,
    fillWithAvailableDataReducer,
} from "./calculator-cases";

export const calcTaxSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setTaxIncome: setTaxIncomeReducer,
        setTaxExpanses: setTaxExpansesReducer,
        setTaxSalary: setTaxSalaryReducer,
        calculateTaxes: calculateTaxesReducer,
        fillWithAvailableData: fillWithAvailableDataReducer(),
    },
});

export const {
    setTaxIncome,
    setTaxExpanses,
    setTaxSalary,
    calculateTaxes,
    fillWithAvailableData,
} = calcTaxSlice.actions;

export const { reducer } = calcTaxSlice;
