import { TableBody, TableRow } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import { useTypedDispatch } from "../../redux/hooks/hooks";
import RemoveRow from "../RemoveRow";
import Cell from "./Cell";
import CheckBox from "../CheckBox";

const TableContent: FC<{
    invoices: IInvoice[];
    filtered: IInvoice[];
    action: ActionCreatorWithPayload<IInvoice[]>;
    clientType: string;
}> = ({ invoices, filtered, action, clientType }) => {
    const dispatch = useTypedDispatch();

    const deleteRow = (index: number) =>
        dispatch(action([...invoices].filter((invoice, i) => i !== index)));

    return (
        <>
            <TableBody>
                {filtered.map((invoice: IInvoice, index: number) => (
                    <TableRow key={index}>
                        <CheckBox
                            index={index}
                            action={action}
                            invoices={invoices}
                            isChecked={invoice.checked}
                        />
                        <Cell
                            invoices={invoices}
                            action={action}
                            name="Номер"
                            index={index}
                            prop="number"
                            type=""
                            disabled={false}
                        >
                            {invoice.number}
                        </Cell>
                        <Cell
                            invoices={invoices}
                            action={action}
                            name="Дата"
                            index={index}
                            prop="date"
                            type="date"
                            disabled={false}
                        >
                            {invoice.date}
                        </Cell>
                        <Cell
                            invoices={invoices}
                            action={action}
                            name={clientType}
                            index={index}
                            prop="client"
                            type=""
                            disabled={false}
                        >
                            {invoice.client}
                        </Cell>
                        <Cell
                            invoices={invoices}
                            action={action}
                            name="в т.ч. НДС"
                            index={index}
                            prop="nds"
                            type="number"
                            disabled={true}
                        >
                            {invoice.nds}
                        </Cell>
                        <Cell
                            invoices={invoices}
                            action={action}
                            name="Сумма"
                            index={index}
                            prop="summ"
                            type="number"
                            disabled={false}
                        >
                            {invoice.summ}
                        </Cell>
                        <RemoveRow action={deleteRow} index={index} />
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};
export default TableContent;
