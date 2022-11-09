import {
    setExpensesRate,
    setIncomeRate,
    setIncomeTaxRate,
} from "@calcstore/calculator-reducer";
import { toFraction } from "@helpers/toPercent";
import { useTypedDispatch } from "@reduxhooks/hooks";

export const useRates = () => {
    const dispatch = useTypedDispatch();

    const handleIncomePercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const IncomePercent = toFraction(+event.target.value);
        dispatch(setIncomeRate(IncomePercent));
    };
    const handleExpensesPercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const ExpensesPercent = toFraction(+event.target.value);
        dispatch(setExpensesRate(ExpensesPercent));
    };
    const handleIncomeTaxPercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const LLCIncomeTaxPercent = toFraction(+event.target.value);
        dispatch(setIncomeTaxRate(LLCIncomeTaxPercent));
    };
    return {
        handleIncomePercent,
        handleExpensesPercent,
        handleIncomeTaxPercent,
    };
};