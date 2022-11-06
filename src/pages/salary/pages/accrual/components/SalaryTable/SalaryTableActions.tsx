import { Box, Button } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    fillByPrevMonth,
    setTaxStateRate as reCalculateAll,
} from "@salarystore/salary-reducer";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import React from "react";
import { ISalary } from "../../exports/interfaces";
import { getPrevMonth } from "../../exports/scripts";
import { months } from "../../exports/utils";

const SalaryTableActions: React.FC<{ salary: ISalary[]; table: string }> = ({
    salary,
    table,
}) => {
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
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <Button variant="outlined" onClick={fillByPrevios}>
                Заполнить
            </Button>
            <Button variant="outlined" onClick={recalculate}>
                Рассчитать
            </Button>
        </Box>
    );
};

export default SalaryTableActions;
