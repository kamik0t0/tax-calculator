import { toRU, toPercentView } from "@helpers/currencyFormat";
import { TableHead, TableRow, TableCell, Table } from "@mui/material";
import React from "react";

const CommonUSNSummary: React.FC<{ total: number; burden: number }> = ({
    total,
    burden,
}) => {
    return (
        <>
            <Table size="small" aria-label="a dense table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell width={600} align="left">
                            3. Итого к уплате (налоги и взносы):
                        </TableCell>
                        <TableCell width={300} align="center">
                            (1) + (2)
                        </TableCell>
                        <TableCell width={250} align="right">
                            {toRU.format(total)}
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Table size="small" aria-label="a dense table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell width={600} align="left">
                            Налоговая нагрузка, %:
                        </TableCell>
                        <TableCell width={300} align="center">
                            (3) / (Д)
                        </TableCell>
                        <TableCell width={250} align="right">
                            {toPercentView.format(burden)}
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </>
    );
};

export default CommonUSNSummary;
