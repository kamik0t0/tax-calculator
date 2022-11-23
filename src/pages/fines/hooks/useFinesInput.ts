import { useSnack } from "@customhooks/useSnack";
import {
    setDebtorType,
    setFinesDebt,
    setFinesDueDate,
    setFinesPayDate,
} from "@finestore/fines-reducer";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { Dayjs } from "dayjs";

export const useFinesInput = () => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();

    const getDebt = (value: number) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        dispatch(setFinesDebt(value));
    };
    const handleDueDate = (date: Dayjs | null) => {
        const parsedDate = date && Date.parse(date.format());
        if (parsedDate) {
            showSnack("warning", "Расчет не актуален. Пересчитайте!");
            dispatch(setFinesDueDate(parsedDate));
        }
    };
    const handlePayDay = (date: Dayjs | null) => {
        const parsedDate = date && Date.parse(date.format());
        if (parsedDate) {
            showSnack("warning", "Расчет не актуален. Пересчитайте!");
            dispatch(setFinesPayDate(parsedDate));
        }
    };
    const handleDebtorType = (event: React.ChangeEvent<HTMLInputElement>) => {
        showSnack("warning", "Расчет не актуален. Пересчитайте!");
        dispatch(setDebtorType((event.target as HTMLInputElement).value));
    };
    return { getDebt, handleDueDate, handlePayDay, handleDebtorType };
};
