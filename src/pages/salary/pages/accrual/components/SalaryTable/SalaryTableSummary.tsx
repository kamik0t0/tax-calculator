import { Stack } from "@mui/material";
import React from "react";
import { Summary } from "../../exports/components";
import { ISalarySummary } from "../../exports/interfaces";

const SalaryTableSummary: React.FC<{ summary: ISalarySummary }> = ({
    summary,
}) => {
    return (
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
    );
};

export default SalaryTableSummary;
