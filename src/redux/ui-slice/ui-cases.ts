import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { ISnackBar } from "types/snackBar";

export const showSuccessSnackBarReducer: CaseReducer<
    ISnackBar,
    PayloadAction<ISnackBar>
> = (state, action) => {
    if (state.shouldShow) {
        state.message = action.payload.message;
        state.open = action.payload.open;
        state.severity = action.payload.severity;
    }
};
export const shouldShowTipsReducer: CaseReducer<
    ISnackBar,
    PayloadAction<boolean>
> = (state, action) => {
    state.shouldShow = action.payload;
};
export const setDialogReducer: CaseReducer<
    ISnackBar,
    PayloadAction<boolean>
> = (state, action) => {
    state.dialog = action.payload;
};
