import {
    calculateTaxes,
    fillWithAvailableData,
} from "@calcstore/calculator-reducer";
import { totalSalarySelector } from "../exports/selectors";
import { useSnack } from "../exports/hooks";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";

export const useCalcActions = () => {
    const VATIncomeSumm = useTypedSelector(
        (state) => state.invoiceSlice.summary.sales.summ
    );
    const VATExpensesSumm = useTypedSelector(
        (state) => state.invoiceSlice.summary.purches.summ
    );
    const SalarySumm = useTypedSelector(totalSalarySelector);
    const showSnack = useSnack();
    const getAvailableData = () => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        dispatch(
            fillWithAvailableData(
                VATIncomeSumm,
                VATExpensesSumm + SalarySumm,
                SalarySumm
            )
        );
    };
    const dispatch = useTypedDispatch();
    const calcTaxes = () => dispatch(calculateTaxes());
    return [getAvailableData, calcTaxes] as const;
};
