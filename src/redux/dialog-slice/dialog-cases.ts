import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "./dialog-reducer";

export const setIsDialogEmployeeRducer: CaseReducer<
    IDialog,
    PayloadAction<boolean>
> = (state, action) => {
    state.isDialogEmployee = action.payload;
};
export const setIsDialogEmployeeDeleteRducer: CaseReducer<
    IDialog,
    PayloadAction<boolean>
> = (state, action) => {
    state.isDialogDeleteEmployee = action.payload;
};
export const setIsDialogReportEmployeeRducer: CaseReducer<
    IDialog,
    PayloadAction<boolean>
> = (state, action) => {
    state.isDialogReportEmployee = action.payload;
};
// заменить на entity adapter
export const setEmployeeIdReducer: CaseReducer<IDialog, PayloadAction<string>> =
    (state, action) => {
        const employeeId = action.payload;
        state.employeeId = employeeId;
    };
