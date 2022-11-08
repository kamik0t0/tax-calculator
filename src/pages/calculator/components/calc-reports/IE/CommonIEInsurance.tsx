import { calcInsuranceSelector } from "@calcstore/selectors/insuranceTotalSelector";
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
    const TotalInsurance = useTypedSelector(calcInsuranceSelector);
    return (
        <Table size="small" aria-label="a dense table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell width={600} align="left">
                        1. Страховые взносы:
                    </TableCell>
                    <TableCell width={300}></TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(TotalInsurance)}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell width={600} align="left">
                        1.1. В ФСС за работников
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
                        1.2. В ФОМС за работников
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
                        1.3. В ФОМС за себя
                    </TableCell>
                    <TableCell width={300} align="center"></TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.insuranceIE.fixMedical)}
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
                <TableRow>
                    <TableCell width={600} align="left">
                        1.5. В ПФР за работников
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
                        1.6. В ПФР за себя (фиксированные)
                    </TableCell>
                    <TableCell width={300} align="center"></TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.insuranceIE.fixRetirement)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        1.7. В ПФР за себя(с доходов)
                    </TableCell>
                    <TableCell width={300} align="center">
                        [(Д) - 300 000] * 1%
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.insuranceIE.floatInsurance)}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default CommonLLCInsurance;
