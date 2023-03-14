import TabPanel from "@sharedcomponents/TabPanel";
import React from "react";
import { SalaryTable } from "../exports/components";
import { ISalary, ISalarySummary } from "../exports/interfaces";
import { Months } from "../exports/utils";

const TabPanelWrapper: React.FC<{
    value: number;
    salary: ISalary[];
    summary: ISalarySummary;
    table: Months;
    index: number;
}> = React.memo(({ value, salary, summary, table, index }) => {
    return (
        <TabPanel value={value} index={index}>
            <SalaryTable salary={salary} summary={summary} table={table} />
        </TabPanel>
    );
});

export default TabPanelWrapper;
