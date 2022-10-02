import { createSlice } from "@reduxjs/toolkit";
import { ISnackBar } from "types/snackBar";
import {
    setDialogRducer,
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
        setDialog: setDialogRducer,
    },
});

export const { showSuccessSnackBar, shouldShowTips, setDialog } =
    snackBarSlice.actions;

export const { reducer } = snackBarSlice;
