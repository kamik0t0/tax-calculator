import { createSlice } from "@reduxjs/toolkit";
import {
    setIsDialogEmployeeRducer,
    setIsDialogEmployeeDeleteRducer,
    setIsDialogReportEmployeeRducer,
} from "./dialog-cases";

export type IDialog = {
    isDialogEmployee: boolean;
    isDialogDeleteEmployee: boolean;
    isDialogReportEmployee: boolean;
};

const initialState: IDialog = {
    isDialogEmployee: false,
    isDialogDeleteEmployee: false,
    isDialogReportEmployee: false,
};

export const snackBarSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setIsDialogEmployee: setIsDialogEmployeeRducer,
        setIsDialogEmployeeDelete: setIsDialogEmployeeDeleteRducer,
        setIsDialogReportEmployee: setIsDialogReportEmployeeRducer,
    },
});

export const {
    setIsDialogEmployee,
    setIsDialogEmployeeDelete,
    setIsDialogReportEmployee,
} = snackBarSlice.actions;

export const { reducer } = snackBarSlice;
