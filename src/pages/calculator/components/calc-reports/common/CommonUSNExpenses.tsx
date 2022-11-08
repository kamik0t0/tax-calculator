import { toRU } from "@helpers/currencyFormat";
import {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
} from "@mui/material";
import React from "react";

const CommonUSNExpenses: React.FC<{
    tax: number;
    income: number;
    costs: number;
    minimal: number;
}> = ({ tax, income, costs, minimal }) => {
    return (
        <Table size="small" aria-label="a dense table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell width={600} align="left">
                        2. Налог УСН:
                    </TableCell>
                    <TableCell width={300} align="center">
                        (2.2) - (2.3) * 15% или (2.3)
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(tax)}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell width={600} align="left">
                        2.1. Доходы, принимаемые к налогообложению
                    </TableCell>
                    <TableCell width={300} align="center">
                        (Д)
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(income)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        2.2. Расходы, принимаемые к налогообложению
                    </TableCell>
                    <TableCell width={300} align="center">
                        (Р) + (1), но не более (Д)
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(costs)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell width={600} align="left">
                        2.3. Минимальный налог
                    </TableCell>
                    <TableCell width={300} align="center">
                        (2.1) * 1%
                    </TableCell>
                    <TableCell width={250} align="right">
                        {toRU.format(minimal)}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default CommonUSNExpenses;
