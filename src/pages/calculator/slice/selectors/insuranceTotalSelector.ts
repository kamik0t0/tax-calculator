import { createSelector } from "@reduxjs/toolkit";
import { State } from "types/state";

const calcInsurance = (state: State) => {
    const { social, medical, retirement, accident } = state.calcSlice.insurance;
    const { fixMedical, fixRetirement, floatInsurance } =
        state.calcSlice.insuranceIE;

    return [
        social,
        medical,
        retirement,
        accident,
        fixMedical,
        fixRetirement,
        floatInsurance,
    ];
};

export const calcInsuranceSelector = createSelector(
    calcInsurance,
    (insurance) => insurance.reduce((summ, cum) => summ + cum, 0)
);
const calcBasicTaxInsurance = (state: State) => {
    const { social, medical, retirement, accident } = state.calcSlice.insurance;
    const { fixMedical, fixRetirement } = state.calcSlice.insuranceIE;

    const { floatInsuranceBasicTax } = state.calcSlice.insuranceIE;

    return [
        social,
        medical,
        retirement,
        accident,
        fixMedical,
        fixRetirement,
        floatInsuranceBasicTax,
    ];
};

export const calcBasicTaxInsuranceSelector = createSelector(
    calcBasicTaxInsurance,
    (insurance) => insurance.reduce((summ, cum) => summ + cum, 0)
);
