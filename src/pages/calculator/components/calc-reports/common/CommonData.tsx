import { toRU } from "@helpers/currencyFormat";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import type { ITax } from "pages/calculator/types/Itax";
import React from "react";

const CommonData: React.FC<{ calcData: ITax }> = ({ calcData }) => {
    return (
        <Table size="small" aria-label="a dense table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell width={600} align="left">
                        Планируемые показатели за год:
                    </TableCell>
                    <TableCell width={300} align="center"></TableCell>
                    <TableCell width={250} align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell width={600} align="left">
                        Доходы
                    </TableCell>
                    <TableCell width={300} align="center"></TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.income)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        Расходы
                    </TableCell>
                    <TableCell width={300} align="center"></TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.expenses)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        Фонд оплаты труда (ФОТ)
                    </TableCell>
                    <TableCell width={300} align="center"></TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(calcData.salary)}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default CommonData;
