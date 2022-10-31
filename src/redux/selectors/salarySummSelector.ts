import { IDialog } from "@dialogstore/dialog-reducer";
import { createSelector } from "@reduxjs/toolkit";
import { ITax } from "pages/calculator/exports/types";
import { ISalaries } from "pages/salary/pages/accrual/exports/interfaces";
import { IInvoices } from "pages/vat/exports/interfaces";
import { ISnackBar } from "types/snackBar";

interface State {
    invoiceSlice: IInvoices;
    salarySlice: ISalaries;
    snackBarSlice: ISnackBar;
    dialogSlice: IDialog;
    calcSlice: ITax;
}

const salaryTotalMonthSelector = (state: State) => {
    const months = state.salarySlice.months;
    const arr: number[] = [];
    for (const month in months) {
        const monthTotalAccrual =
            state.salarySlice.months[month].summary.accruedTotal;
        arr.push(monthTotalAccrual);
    }
    return arr;
};

export const totalSalarySelector = createSelector(
    salaryTotalMonthSelector,
    (total) => total.reduce((sum, current) => sum + current, 0)
);
