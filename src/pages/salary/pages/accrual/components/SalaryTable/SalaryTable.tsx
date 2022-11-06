import { Stack } from "@mui/material";
import React, { FC, memo } from "react";
import {
    SalaryTableActions,
    SalaryTableData,
    SalaryTableSummary,
} from "../../exports/components";
import { ISalary, ISalarySummary } from "../../exports/interfaces";

const SalaryTable: FC<{
    salary: ISalary[];
    summary: ISalarySummary;
    table: string;
}> = memo(({ salary, summary, table }) => {
    return (
        <Stack spacing={2}>
            <SalaryTableSummary summary={summary} />
            <SalaryTableActions salary={salary} table={table} />
            <SalaryTableData salary={salary} table={table} />
        </Stack>
    );
});

export default SalaryTable;
