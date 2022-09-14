import { Button, Paper, Stack, Table, TableContainer } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import {
    addRow,
    deleteRows,
    fillByPrevMonth,
} from "@salarystore/salary-reducer";
import React, { FC } from "react";
import {
    LastRow,
    Summary,
    TableContent,
    TableHeader,
} from "../exports/components";
import { ISalary, ISalarySummary } from "../exports/interfaces";
import { newEmployee } from "../exports/utils";

const SalaryTable: FC<{
    salary: ISalary[];
    summary: ISalarySummary;
    table: string;
}> = ({ salary, summary, table }) => {
    const employee = Object.assign({}, newEmployee, {
        id: nanoid(6),
    });
    const dispatch = useTypedDispatch();
    const createItem = () => dispatch(addRow(employee, table));
    const deleteItems = () => dispatch(deleteRows(table));
    const fillByPrevios = () => dispatch(fillByPrevMonth(table));

    return (
        <Stack spacing={3}>
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
            <Button onClick={fillByPrevios}>Заполнить</Button>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHeader salary={salary} table={table} />
                    <TableContent salary={salary} table={table} />
                </Table>
                <LastRow createItem={createItem} deleteItem={deleteItems} />
            </TableContainer>
        </Stack>
    );
};

export default SalaryTable;
