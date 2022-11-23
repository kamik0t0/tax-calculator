import { useSnack } from "@customhooks/useSnack";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    fillByPrevMonth,
    setTaxStateRate as reCalculateAll,
} from "@salarystore/salary-reducer";
import { ISalary } from "../exports/interfaces";
import { months } from "../exports/utils";
import { getPrevMonth } from "../scripts/getPrevMonth";

export const useSalaryActions = (salary: ISalary[], table: string) => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();

    const slice = useTypedSelector((state) => state.salarySlice);
    const { rateCode } = useTypedSelector((state) => state.salarySlice);
    const fillByPrevios = () => {
        const prevMonth = getPrevMonth(table, months);
        if (
            !prevMonth ||
            slice.months[prevMonth].salary.length === 0 ||
            table === "jan"
        ) {
            showSnack("warning", "В предыдущем месяце нет данных!");
            return;
        }
        showSnack("info", "Таблица заполнена! Нажмите рассчитать");
        dispatch(fillByPrevMonth(table));
    };
    const recalculate = () => {
        if (salary.length === 0) {
            showSnack("warning", "Таблица пуста");
            return;
        }
        showSnack("info", "Взносы пересчитаны!");
        dispatch(reCalculateAll(rateCode));
    };

    return [fillByPrevios, recalculate] as const;
};
