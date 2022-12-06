import { toPercent } from "@helpers/toPercent";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const ratesToPercent = (state: RootState) => {
    const { incomeRate, expensesRate, LLCIncomeRate } = state.calcSlice.rates;
    const incomeRatePercent = toPercent(incomeRate, 2);
    const expensesRatePercent = toPercent(expensesRate, 2);
    const LLCIncomeRatePercent = toPercent(LLCIncomeRate, 3);

    return [incomeRatePercent, expensesRatePercent, LLCIncomeRatePercent];
};

export const toPercentRateSelector = createSelector(
    ratesToPercent,
    (rates) => rates
);
