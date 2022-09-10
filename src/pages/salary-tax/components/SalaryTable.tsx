import {
    Container,
    Paper,
    Stack,
    Table,
    TableContainer,
    Button,
} from "@mui/material";
import LastRow from "../../../shared/LastRow";
import React, { FC } from "react";
import TableHeader from "./SalaryTableHeader";
import { ISalary, ISalarySummary } from "../interfaces/ISalary";
import TableContent from "./TableContent";
import {
    addRow,
    deleteRows,
} from "../../../redux/reducers/salary/salary-reducer";
import { useTypedDispatch } from "../../../redux/hooks/hooks";
import { newEmployee } from "../utils/createData";
import SelectTaxRate from "./SelectTaxRate";
import { nanoid } from "@reduxjs/toolkit";
import Summary from "../../nds/components/InvoiceTable/Summary";
import { fillByPrevMonth } from "../../../redux/reducers/salary/salary-reducer";

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

    const fillByPrevios = () => {
        dispatch(fillByPrevMonth(table));
    };
    return (
        <Stack spacing={3}>
            <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "space-around" }}
            >
                <SelectTaxRate />
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
                <Button onClick={fillByPrevios}>Заполнить</Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHeader salary={salary} table={table} />
                    <TableContent salary={salary} table={table} />
                </Table>
                <LastRow createItem={createItem} deleteItem={deleteItems} />
            </TableContainer>
        </Stack>
    );
};

export default SalaryTable;
