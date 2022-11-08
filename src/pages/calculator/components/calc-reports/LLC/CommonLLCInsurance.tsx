import { calcEmployeeInsuranceSelector } from "@calcstore/selectors/insuranceEmployeeSelector";
import { toRU } from "@helpers/currencyFormat";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import type { ITax } from "../../../exports/types";

const CommonLLCInsurance: React.FC<{ calcData: ITax }> = ({ calcData }) => {
    const EmployeeInsurance = useTypedSelector(calcEmployeeInsuranceSelector);
    return (
        <Table size="small" aria-label="a dense table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell width={600} align="left">
                        1. Страховые взносы:
                    </TableCell>
                    <TableCell width={300}></TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(EmployeeInsurance)}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell width={600} align="left">
                        1.1. В ПФР за работников
                    </TableCell>
                    <TableCell width={300} align="center">
                        (ФОТ) * 22%
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.insurance.retirement)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        1.2. В ФСС за работников
                    </TableCell>
                    <TableCell width={300} align="center">
                        (ФОТ) * 2.9%
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.insurance.social)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        1.3. В ФОМС за работников
                    </TableCell>
                    <TableCell width={300} align="center">
                        (ФОТ) * 5.1%
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.insurance.medical)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        1.4. От несчастных случаев за работников
                    </TableCell>
                    <TableCell width={300} align="center">
                        (ФОТ) * 0.2%
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.insurance.accident)}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default CommonLLCInsurance;
