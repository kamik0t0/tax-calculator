import {
    deleteRow as deleteTableRow,
    setCheckBox,
    updateInvoice,
} from "@invoicesstore/invoice-reducer";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import RemoveRow from "@sharedcomponents/RemoveRow";
import React, { FC } from "react";
import { SelectRateCell } from "../exports/components";
import { IInvoice } from "../exports/interfaces";
import InputCell from "@sharedcomponents/InputCell";
import DateCell from "@sharedcomponents/DateCell";

const TableContent: FC<{
    filtered: IInvoice[];
    table: string;
}> = ({ filtered, table }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => dispatch(deleteTableRow(index, table));

    // number | string
    const getInputData = (
        value: string | number,
        index: number,
        prop: string
    ) => dispatch(updateInvoice(value, table, index.toString(), prop));
    // date
    const getDate = (date: string, index: number) =>
        dispatch(updateInvoice(date, table, index.toString(), "date"));
    // select
    const getSelectValue = (rate: string, index: number) =>
        dispatch(updateInvoice(rate, table, index.toString(), "rate"));

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

                        <InputCell
                            index={index}
                            width={100}
                            type="string"
                            prop="number"
                            getInputData={getInputData}
                        >
                            {invoice.number}
                        </InputCell>
                        <DateCell width={120} index={index} getDate={getDate}>
                            {invoice.date}
                        </DateCell>
                        <InputCell
                            width={230}
                            index={index}
                            type="string"
                            prop="client"
                            getInputData={getInputData}
                        >
                            {invoice.client}
                        </InputCell>
                        <SelectRateCell
                            index={index}
                            width={140}
                            getSelectValue={getSelectValue}
                        >
                            {invoice.rate}
                        </SelectRateCell>
                        <InputCell
                            width={100}
                            index={index}
                            type="number"
                            prop="nds"
                            isMoney={true}
                            getInputData={getInputData}
                        >
                            {invoice.nds}
                        </InputCell>
                        <InputCell
                            width={110}
                            index={index}
                            type="number"
                            prop="summ"
                            isMoney={true}
                            getInputData={getInputData}
                        >
                            {invoice.summ}
                        </InputCell>
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