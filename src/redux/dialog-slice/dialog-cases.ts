import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "./dialog-reducer";

export const setDialogEmployeeRducer: CaseReducer<
    IDialog,
    PayloadAction<boolean>
> = (state, action) => {
    state.dialogEmployee = action.payload;
};
export const setDialogEmployeeDeleteRducer: CaseReducer<
    IDialog,
    PayloadAction<boolean>
> = (state, action) => {
    state.dialogDeleteEmployee = action.payload;
};
