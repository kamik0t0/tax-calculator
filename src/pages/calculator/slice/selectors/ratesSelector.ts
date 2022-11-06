import { toPercent } from "@helpers/toPercent";
import { createSelector } from "@reduxjs/toolkit";
import { State } from "types/state";

const ratesToPercent = (state: State) => {
    const { incomeRate, expensesRate, LLCIncomeRate } = state.calcSlice.rates;
    const incomeRatePercent = toPercent(incomeRate);
    const expensesRatePercent = toPercent(expensesRate);
    const LLCIncomeRatePercent = toPercent(LLCIncomeRate);

    return [incomeRatePercent, expensesRatePercent, LLCIncomeRatePercent];
};

export const toPercentRateSelector = createSelector(
    ratesToPercent,
    (rates) => rates
);
