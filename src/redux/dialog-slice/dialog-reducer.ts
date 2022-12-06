import { createSlice } from "@reduxjs/toolkit";
import {
    setIsDialogEmployeeRducer,
    setIsDialogEmployeeDeleteRducer,
    setIsDialogReportEmployeeRducer,
    setEmployeeIdReducer,
} from "./dialog-cases";

export type IDialog = {
    isDialogEmployee: boolean;
    isDialogDeleteEmployee: boolean;
    isDialogReportEmployee: boolean;
    employeeId: string | undefined;
};

const initialState: IDialog = {
    isDialogEmployee: false,
    isDialogDeleteEmployee: false,
    isDialogReportEmployee: false,
    employeeId: undefined,
};

export const snackBarSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setIsDialogEmployee: setIsDialogEmployeeRducer,
        setIsDialogEmployeeDelete: setIsDialogEmployeeDeleteRducer,
        setIsDialogReportEmployee: setIsDialogReportEmployeeRducer,
        setEmployeeId: setEmployeeIdReducer,
    },
});

export const {
    setIsDialogEmployee,
    setIsDialogEmployeeDelete,
    setIsDialogReportEmployee,
    setEmployeeId,
} = snackBarSlice.actions;

export const { reducer } = snackBarSlice;
