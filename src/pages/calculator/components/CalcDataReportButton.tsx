import { useFontHeaders } from "@customhooks/useFontHeader";
import { toRU } from "@helpers/currencyFormat";
import { Button, Typography } from "@mui/material";
import React from "react";

const CalcDataReportButton: React.FC<{
    toggleIncomeIEDialog: () => void;
    value: number;
}> = ({ toggleIncomeIEDialog, value }) => {
    const [_, valueTextColor] = useFontHeaders();
    return (
        <Button onClick={toggleIncomeIEDialog} variant="text" size="small">
            <Typography align="right" sx={valueTextColor}>
                {toRU.format(value)}
            </Typography>
        </Button>
    );
};

export default CalcDataReportButton;
