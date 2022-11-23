import {
    setTaxExpanses,
    setTaxIncome,
    setTaxSalary,
} from "@calcstore/calculator-reducer";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { useSnack } from "../exports/hooks";

export const useUserInputData = () => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();

    const getIncomeValue = (value: number) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        dispatch(setTaxIncome(value));
    };
    const getExpensesValue = (value: number) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        dispatch(setTaxExpanses(value));
    };
    const getSalaryValue = (value: number) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        dispatch(setTaxSalary(value));
    };
    return { getIncomeValue, getExpensesValue, getSalaryValue };
};
