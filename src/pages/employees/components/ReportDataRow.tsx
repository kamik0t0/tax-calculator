import { TableCell } from "@mui/material";
import React from "react";

const ReportDataRow: React.FC<{ data: number[]; children: string }> = ({
    data,
    children,
}) => {
    return (
        <>
            <TableCell align="center">{children}</TableCell>
            {data.map((accrualSumm, index) => (
                <TableCell key={index} align="center">
                    {accrualSumm.toFixed(2)}
                </TableCell>
            ))}
        </>
    );
};

export default ReportDataRow;
