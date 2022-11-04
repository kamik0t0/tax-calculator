import { useScrollToLastRow } from "@customhooks/useScrollToLastRow";
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableContainer,
    useTheme,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import {
    addRow,
    deleteRows,
    fillByPrevMonth,
    setTaxStateRate as reCalculateAll,
} from "@salarystore/salary-reducer";
import LastRow from "@sharedcomponents/LastRow";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import React, { FC, memo } from "react";
import { Summary, TableContent, TableHeader } from "../exports/components";
import { ISalary, ISalarySummary } from "../exports/interfaces";
import { getPrevMonth } from "../exports/scripts";
import { months, newSalaryTableRow } from "../exports/utils";

const SalaryTable: FC<{
    salary: ISalary[];
    summary: ISalarySummary;
    table: string;
}> = memo(({ salary, summary, table }) => {
    const dispatch = useTypedDispatch();
    const slice = useTypedSelector((state) => state.salarySlice);
    const { rateCode } = useTypedSelector((state) => state.salarySlice);
    const theme = useTheme();
    const elevation = theme.palette.mode === "dark" ? 10 : 1;
    const newRow = Object.assign({}, newSalaryTableRow, {
        id: nanoid(5),
    });

    const setConteinerHeight = useScrollToLastRow("lastRow");

    const createItem = () => {
        setConteinerHeight(Math.random());
        dispatch(addRow(newRow, table));
    };
    const deleteItems = () => dispatch(deleteRows(table));
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
        <Stack spacing={2}>
            <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "space-around" }}
            >
                <Summary
                    text="Итого начислено"
                    width={140}
                    textVariant="h6"
                    direction="column"
                >
                    {summary.accruedTotal}
                </Summary>
                <Summary
                    text="Итого выплачено"
                    width={140}
                    textVariant="h6"
                    direction="column"
                >
                    {summary.payTotal}
                </Summary>
                <Summary
                    text="Итого НДФЛ"
                    width={140}
                    textVariant="h6"
                    direction="column"
                >
                    {summary.taxTotal}
                </Summary>
                <Summary
                    text="Итого взносы"
                    width={140}
                    textVariant="h6"
                    direction="column"
                >
                    {summary.insuranceTotal}
                </Summary>
            </Stack>
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

            <Paper
                component="div"
                sx={{
                    width: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
                elevation={elevation}
            >
                <TableContainer sx={{ maxHeight: 520 }}>
                    <Table
                        stickyHeader
                        size="small"
                        aria-label="a dense table"
                        id="SalaryTable"
                    >
                        <TableHeader salary={salary} table={table} />
                        <TableContent salary={salary} table={table} />
                    </Table>
                    <LastRow createItem={createItem} deleteItem={deleteItems} />
                </TableContainer>
            </Paper>
        </Stack>
    );
});

export default SalaryTable;
