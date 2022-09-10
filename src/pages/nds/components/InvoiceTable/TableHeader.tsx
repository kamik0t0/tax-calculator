import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import React, { FC } from "react";
import { makePointer } from "../../../../utils/malePointer";
import ArrowDownwardSharpIcon from "@mui/icons-material/ArrowDownwardSharp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useSort } from "../../../../hooks/useSort";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { updateInvoices } from "../../../../redux/reducers/invoices/invoice-reducer";
import { SortFields } from "../../utils/enums";
import { IInvoice } from "../../interfaces/IInvoice";
import { HeaderNames } from "../../utils/enums";

const TableHeader: FC<{
    clientType: string;
    filtered: IInvoice[];
    table: string;
}> = ({ clientType, filtered, table }) => {
    const dispatch = useTypedDispatch();
    const { byDate, byNumber, byString, sortOrder } = useSort(filtered);

    const sortByDate = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateInvoices(byDate(SortFields.date), table));

    const sortByString = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateInvoices(byString(SortFields.client), table));

    const sortByNumber = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateInvoices(byNumber(SortFields.summ), table));

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">
                    <Box>
                        {sortOrder ? (
                            <ArrowDownwardSharpIcon sx={{ height: 15 }} />
                        ) : (
                            <ArrowUpwardIcon sx={{ height: 15 }} />
                        )}
                    </Box>
                </TableCell>
                <TableCell
                    sx={makePointer()}
                    onClick={sortByString}
                    align="center"
                >
                    {HeaderNames.number}
                </TableCell>
                <TableCell
                    sx={makePointer()}
                    onClick={sortByDate}
                    align="center"
                >
                    {HeaderNames.date}
                </TableCell>
                <TableCell
                    sx={makePointer()}
                    onClick={sortByString}
                    align="center"
                >
                    {clientType}
                </TableCell>
                <TableCell
                    sx={makePointer()}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.nds}
                </TableCell>
                <TableCell
                    sx={makePointer()}
                    onClick={sortByNumber}
                    align="center"
                >
                    {HeaderNames.summ}
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
