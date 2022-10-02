import { createSlice } from "@reduxjs/toolkit";
import {
    setDialogEmployeeRducer,
    setDialogEmployeeDeleteRducer,
} from "./dialog-cases";

export type IDialog = {
    dialogEmployee: boolean;
    dialogDeleteEmployee: boolean;
};

const initialState: IDialog = {
    dialogEmployee: false,
    dialogDeleteEmployee: false,
};

export const snackBarSlice = createSlice({
    name: "salaries",
    initialState,
    reducers: {
        setDialogEmployee: setDialogEmployeeRducer,
        setDialogEmployeeDelete: setDialogEmployeeDeleteRducer,
    },
});

export const { setDialogEmployee, setDialogEmployeeDelete } =
    snackBarSlice.actions;

export const { reducer } = snackBarSlice;
