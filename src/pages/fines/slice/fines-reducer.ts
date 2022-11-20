import { createSlice } from "@reduxjs/toolkit";
import {
    setFinesReducer,
    setFinesDebtReducer,
    setFinesDueDateReducer,
    setFinesPayDateReducer,
    setDebtorTypeReducer,
} from "./fines-cases";
import { IFines } from "../exports/types";

export const initialState: IFines = {
    finesData: [],
    debt: 0,
    dueDate: 0,
    payDate: 0,
    debtorType: "org",
    fineSumm: 0,
    days: 0,
    isError: false,
};

export const finesSlice = createSlice({
    name: "fines",
    initialState,
    reducers: {
        setFines: setFinesReducer,
        setFinesDebt: setFinesDebtReducer,
        setFinesDueDate: setFinesDueDateReducer,
        setFinesPayDate: setFinesPayDateReducer,
        setDebtorType: setDebtorTypeReducer,
    },
});

export const {
    setFines,
    setFinesDebt,
    setFinesDueDate,
    setFinesPayDate,
    setDebtorType,
} = finesSlice.actions;

export const { reducer } = finesSlice;
