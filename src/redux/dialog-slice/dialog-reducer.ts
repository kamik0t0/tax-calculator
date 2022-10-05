import { createSlice } from "@reduxjs/toolkit";
import {
    setDialogEmployeeRducer,
    setDialogEmployeeDeleteRducer,
    setDialogReportEmployeeRducer,
} from "./dialog-cases";

export type IDialog = {
    dialogEmployee: boolean;
    dialogDeleteEmployee: boolean;
    dialogReportEmployee: boolean;
};

const initialState: IDialog = {
    dialogEmployee: false,
    dialogDeleteEmployee: false,
    dialogReportEmployee: false,
};

export const snackBarSlice = createSlice({
    name: "salaries",
    initialState,
    reducers: {
        setDialogEmployee: setDialogEmployeeRducer,
        setDialogEmployeeDelete: setDialogEmployeeDeleteRducer,
        setDialogReportEmployee: setDialogReportEmployeeRducer,
    },
});

export const {
    setDialogEmployee,
    setDialogEmployeeDelete,
    setDialogReportEmployee,
} = snackBarSlice.actions;

export const { reducer } = snackBarSlice;
