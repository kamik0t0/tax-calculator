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
                <TableCell variant="head" width={50}>
                    <Box>
                        {sortOrder ? (
                            <ArrowDownwardSharpIcon
                                sx={{ height: 15, ml: 1 }}
                            />
                        ) : (
                            <ArrowUpwardIcon sx={{ height: 15, ml: 1 }} />
                        )}
                    </Box>
                </TableCell>

                <TableCell
                    variant="head"
                    width={100}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={sortByString}
                    align="center"
                >
                    {HeaderNames.number}
                </TableCell>
                <TableCell
                    variant="head"
                    width={150}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={sortByDate}
                    align="center"
                >
                    {HeaderNames.date}
                </TableCell>
                <TableCell
                    variant="head"
                    width={240}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={sortByString}
                    align="center"
                >
                    {clientType}
                </TableCell>
                <TableCell
                    variant="head"
                    width={140}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.rate}
                </TableCell>
                <TableCell
                    variant="head"
                    width={100}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.nds}
                </TableCell>
                <TableCell
                    variant="head"
                    width={110}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.summ}
                </TableCell>
                <TableCell variant="head" width={60}>
                    Удалить
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
