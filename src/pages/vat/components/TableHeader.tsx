import { useSort } from "@customhooks/useSort";
import { updateInvoices } from "@invoicesstore/invoice-reducer";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import React, { FC } from "react";
import { IInvoice } from "../exports/interfaces";
import { HeaderNames, SortFields } from "../exports/utils";

const TableHeader: FC<{
    clientType: string;
    filtered: IInvoice[];
    table: string;
}> = ({ clientType, filtered, table }) => {
    const dispatch = useTypedDispatch();
    const { byNumber, byString, sortOrder } = useSort(filtered);

    const sortByDate = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateInvoices(byNumber(SortFields.date), table));

    const sortByString = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateInvoices(byString(SortFields.client), table));

    const sortByNumber = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateInvoices(byNumber(SortFields.summ), table));

    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ width: 40 }}>
                    <Box sx={{ ml: 2 }}>
                        {sortOrder ? (
                            <ArrowDownwardSharpIcon sx={{ height: 15 }} />
                        ) : (
                            <ArrowUpwardIcon sx={{ height: 15 }} />
                        )}
                    </Box>
                </TableCell>

                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 100 }}
                    onClick={sortByString}
                    align="center"
                >
                    {HeaderNames.number}
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 130 }}
                    onClick={sortByDate}
                    align="center"
                >
                    {HeaderNames.date}
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 230 }}
                    onClick={sortByString}
                    align="center"
                >
                    {clientType}
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 140 }}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.rate}
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.nds}
                </TableCell>
                <TableCell
                    sx={{ "&:hover": { cursor: "pointer" }, width: 110 }}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.summ}
                </TableCell>
                <TableCell sx={{ width: 20 }}>Удалить</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
