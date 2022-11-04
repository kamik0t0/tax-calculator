import { createSelector } from "@reduxjs/toolkit";
import { State } from "types/state";

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
