import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    fillByPrevMonth,
    setTaxStateRate as reCalculateAll,
} from "@salarystore/salary-reducer";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import { ISalary } from "../exports/interfaces";
import { months } from "../exports/utils";
import { getPrevMonth } from "../scripts/getPrevMonth";

export const useSalaryActions = (salary: ISalary[], table: string) => {
    const dispatch = useTypedDispatch();
    const slice = useTypedSelector((state) => state.salarySlice);
    const { rateCode } = useTypedSelector((state) => state.salarySlice);
    const fillByPrevios = () => {
        const prevMonth = getPrevMonth(table, months);
        if (
            !prevMonth ||
            slice.months[prevMonth].salary.length === 0 ||
            table === "jan"
        ) {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "В предыдущем месяце нет данных!",
                })
            );
            return;
        }
        dispatch(
            showSuccessSnackBar({
                open: true,
                severity: "info",
                message: "Таблица заполнена! Нажмите рассчитать",
            })
        );
        dispatch(fillByPrevMonth(table));
    };
    const recalculate = () => {
        if (salary.length === 0) {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Таблица пуста",
                })
            );
            return;
        }
        dispatch(
            showSuccessSnackBar({
                open: true,
                severity: "info",
                message: "Взносы пересчитаны!",
            })
        );
        dispatch(reCalculateAll(rateCode));
    };

    return [fillByPrevios, recalculate] as const;
};
