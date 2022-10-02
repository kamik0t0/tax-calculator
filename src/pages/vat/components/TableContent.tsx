import {
    deleteRow as deleteTableRow,
    setCheckBox,
} from "@invoicesstore/invoice-reducer";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import RemoveRow from "@sharedcomponents/RemoveRow";
import React, { FC } from "react";
import { Cell } from "../exports/components";
import { IInvoice } from "../exports/interfaces";

const TableContent: FC<{
    filtered: IInvoice[];
    table: string;
}> = ({ filtered, table }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => dispatch(deleteTableRow(index, table));
    return (
        <>
            <TableBody>
                {filtered.map((invoice: IInvoice, index: number) => (
                    <TableRow key={index}>
                        <TableCell sx={{ width: 40 }}>
                            <Checkbox
                                size="small"
                                checked={invoice.checked}
                                onChange={() =>
                                    dispatch(setCheckBox(index, table))
                                }
                                sx={{ ml: 1 }}
                            />
                        </TableCell>

                        <Cell
                            table={table}
                            index={index}
                            prop="number"
                            type=""
                            disabled={false}
                            width={40}
                        >
                            {invoice.number}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="date"
                            type="date"
                            disabled={false}
                            width={120}
                        >
                            {invoice.date}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="client"
                            type=""
                            disabled={false}
                            width={230}
                        >
                            {invoice.client}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="rate"
                            type="select"
                            disabled={false}
                            width={140}
                            vatRate={invoice.rate}
                        >
                            {invoice.rate}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="nds"
                            type="number"
                            disabled={false}
                            width={100}
                        >
                            {invoice.nds}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="summ"
                            type="number"
                            disabled={false}
                            width={110}
                        >
                            {invoice.summ}
                        </Cell>
                        <TableCell>
                            <RemoveRow action={deleteRow} index={index} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};
export default TableContent;
