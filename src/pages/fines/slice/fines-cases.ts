import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IFines } from "../exports/types";
import { FinesCalcIE } from "../classes/finesCalcIE";
import { FinesCalcLLC } from "../classes/finesCalcLLC";

export const setFinesReducer: CaseReducer<IFines> = (state) => {
    if (state.dueDate > state.payDate) {
        state.isError = true;
        state.finesData = [];
    } else {
        state.isError = false;
        if (state.debtorType === "org") {
            const finesData = new FinesCalcLLC(
                state.debt,
                state.dueDate,
                state.payDate
            );
            const finesArr = finesData.finesArr();
            state.days = finesData.calcDays(finesArr);
            state.fineSumm = finesData.calcFines(finesArr);
            state.finesData = finesArr;
        } else {
            const finesData = new FinesCalcIE(
                state.debt,
                state.dueDate,
                state.payDate
            );
            const finesArr = finesData.finesArr();
            state.days = finesData.calcDays(finesArr);
            state.fineSumm = finesData.calcFines(finesArr);
            state.finesData = finesArr;
        }
    }
};
export const setFinesDebtReducer: CaseReducer<IFines, PayloadAction<number>> = (
    state,
    action
) => {
    state.debt = action.payload;
};
export const setFinesDueDateReducer: CaseReducer<
    IFines,
    PayloadAction<number>
> = (state, action) => {
    state.dueDate = action.payload;
};
export const setFinesPayDateReducer: CaseReducer<
    IFines,
    PayloadAction<number>
> = (state, action) => {
    state.payDate = action.payload;
};
export const setDebtorTypeReducer: CaseReducer<
    IFines,
    PayloadAction<string>
> = (state, action) => {
    state.debtorType = action.payload;
};
