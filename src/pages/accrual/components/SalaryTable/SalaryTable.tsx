import { Stack } from "@mui/material";
import { Months } from "../../exports/utils";
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
    table: Months;
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
