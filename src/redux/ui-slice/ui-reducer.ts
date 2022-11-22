import { createSlice } from "@reduxjs/toolkit";
import { ISnackBar } from "types/snackBar";
import {
    setDialogReducer,
    shouldShowTipsReducer,
    showSuccessSnackBarReducer,
} from "./ui-cases";

const initialState: ISnackBar = {
    severity: "success",
    open: false,
    message: "Ok",
    shouldShow: true,
    dialog: false,
};

export const snackBarSlice = createSlice({
    name: "salaries",
    initialState,
    reducers: {
        showSuccessSnackBar: showSuccessSnackBarReducer,
        shouldShowTips: shouldShowTipsReducer,
        setDialog: setDialogReducer,
    },
});

export const { showSuccessSnackBar, shouldShowTips, setDialog } =
    snackBarSlice.actions;

export const { reducer } = snackBarSlice;
