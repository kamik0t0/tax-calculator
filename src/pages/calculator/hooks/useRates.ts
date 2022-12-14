import {
    setExpensesRate,
    setIncomeRate,
    setIncomeTaxRate,
} from "@calcstore/calculator-reducer";
import { toFraction } from "@helpers/toPercent";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { useSnack } from "../exports/hooks";

export const useRates = () => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();

    const handleIncomePercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        const IncomePercent = toFraction(+event.target.value, 2);
        dispatch(setIncomeRate(IncomePercent));
    };
    const handleExpensesPercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        const ExpensesPercent = toFraction(+event.target.value, 2);
        dispatch(setExpensesRate(ExpensesPercent));
    };
    const handleIncomeTaxPercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        const LLCIncomeTaxPercent = toFraction(+event.target.value, 3);
        dispatch(setIncomeTaxRate(LLCIncomeTaxPercent));
    };
    return {
        handleIncomePercent,
        handleExpensesPercent,
        handleIncomeTaxPercent,
    };
};
