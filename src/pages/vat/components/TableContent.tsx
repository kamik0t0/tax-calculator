import {
    deleteRow as deleteTableRow,
    setCheckBox,
} from "@invoicesstore/invoice-reducer";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import DateCell from "@sharedcomponents/DateCell";
import InputCell from "@sharedcomponents/InputCell";
import RemoveRow from "@sharedcomponents/RemoveRow";
import React, { FC } from "react";
import { SelectRateCell } from "../exports/components";
import { IInvoice } from "../exports/interfaces";
import { useInvoiceData } from "../exports/hooks";

const TableContent: FC<{
    filtered: IInvoice[];
    table: string;
}> = ({ filtered, table }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => dispatch(deleteTableRow(index, table));
    const { getNDS, getDate, getRate, getSumm, getNum, getClient } =
        useInvoiceData(table);

    return (
        <>
            <TableBody>
                {filtered.map((invoice: IInvoice, index: number) => (
                    <TableRow key={index}>
                        <TableCell variant="body">
                            <Checkbox
                                size="small"
                                checked={invoice.checked}
                                onChange={() =>
                                    dispatch(setCheckBox(index, table))
                                }
                                sx={{ ml: 1 }}
                            />
                        </TableCell>
                        <InputCell
                            index={index}
                            type="string"
                            prop="number"
                            getInputData={getNum}
                        >
                            {invoice.number}
                        </InputCell>
                        <DateCell index={index} getDate={getDate}>
                            {invoice.date}
                        </DateCell>
                        <InputCell
                            index={index}
                            type="string"
                            prop="client"
                            getInputData={getClient}
                        >
                            {invoice.client}
                        </InputCell>
                        <SelectRateCell index={index} getSelectValue={getRate}>
                            {invoice.rate}
                        </SelectRateCell>
                        <InputCell
                            index={index}
                            type="number"
                            prop="nds"
                            isMoney={true}
                            getInputData={getNDS}
                        >
                            {invoice.nds}
                        </InputCell>
                        <InputCell
                            index={index}
                            type="number"
                            prop="summ"
                            isMoney={true}
                            getInputData={getSumm}
                        >
                            {invoice.summ}
                        </InputCell>
                        <TableCell variant="body">
                            <RemoveRow action={deleteRow} index={index} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};
export default TableContent;
