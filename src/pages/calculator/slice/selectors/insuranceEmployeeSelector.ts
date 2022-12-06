import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const calcEmployeeInsurance = (state: RootState) => {
    const { social, medical, retirement, accident } = state.calcSlice.insurance;
    return [social, medical, retirement, accident];
};

export const calcEmployeeInsuranceSelector = createSelector(
    calcEmployeeInsurance,
    (insurance) => insurance.reduce((summ, cum) => summ + cum, 0)
);
