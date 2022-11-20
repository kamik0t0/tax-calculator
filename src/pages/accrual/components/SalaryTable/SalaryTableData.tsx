import { useScrollToLastRow } from "@customhooks/useScrollToLastRow";
import { Paper, Table, TableContainer, useTheme } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { addRow, deleteRows } from "@salarystore/salary-reducer";
import LastRow from "@sharedcomponents/LastRow";
import React from "react";
import { TableContent, TableHeader } from "../../exports/components";
import { newSalaryTableRow } from "../../exports/utils";
import { ISalary } from "../../types/salary";

const SalaryTableData: React.FC<{ salary: ISalary[]; table: string }> = ({
    salary,
    table,
}) => {
    const dispatch = useTypedDispatch();
    const theme = useTheme();

    const setConteinerHeight = useScrollToLastRow("lastRow");
    const elevation = theme.palette.mode === "dark" ? 10 : 1;
    const newRow = Object.assign({}, newSalaryTableRow, {
        id: nanoid(5),
    });
    const createItem = () => {
        setConteinerHeight(Math.random());
        dispatch(addRow(newRow, table));
    };
    const deleteItems = () => dispatch(deleteRows(table));
    return (
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
    );
};

export default SalaryTableData;
