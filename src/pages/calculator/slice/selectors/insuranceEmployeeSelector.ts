import { createSelector } from "@reduxjs/toolkit";
import { State } from "types/state";

const calcEmployeeInsurance = (state: State) => {
    const { social, medical, retirement, accident } = state.calcSlice.insurance;

    return [social, medical, retirement, accident];
};

export const calcEmployeeInsuranceSelector = createSelector(
    calcEmployeeInsurance,
    (insurance) => insurance.reduce((summ, cum) => summ + cum, 0)
);
