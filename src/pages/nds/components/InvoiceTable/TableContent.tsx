import { Checkbox, TableBody, TableRow } from "@mui/material";
import React, { FC } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import {
    deleteRow as deleteTableRow,
    setCheckBox,
} from "../../../../redux/reducers/invoices/invoice-reducer";
import Cell from "./Cell";
import RemoveRow from "../../../../shared/RemoveRow";

const TableContent: FC<{
    invoices: IInvoice[];
    filtered: IInvoice[];
    table: string;
    clientType: string;
}> = ({ invoices, filtered, table, clientType }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => dispatch(deleteTableRow(index, table));
    return (
        <>
            <TableBody>
                {filtered.map((invoice: IInvoice, index: number) => (
                    <TableRow key={index}>
                        <Checkbox
                            checked={invoice.checked}
                            onChange={() => dispatch(setCheckBox(index, table))}
                            sx={{ marginTop: 1 }}
                        />
                        <Cell
                            invoices={invoices}
                            table={table}
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
                            table={table}
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
                            table={table}
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
                            table={table}
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
                            table={table}
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
