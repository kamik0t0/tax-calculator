import React from "react";
import { IInvoice } from "../../../interfaces/IInvoice";
import { useTypedDispatch } from "../../../redux/hooks/hooks";
import { updateInvoice } from "../../../redux/reducers/invoice-reducer";

export const useCellValue = (
    invoices: IInvoice[],
    index: number,
    prop: string,
    table: string,
    switchInput: () => void
) => {
    const dispatch = useTypedDispatch();
    const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value);

    const setValue = (value: string) => {
        const InvoiceToDispatch = Object.assign({}, invoices[index]);
        if (prop === "summ") {
            // присваиваем значение
            InvoiceToDispatch[prop] = +value;
            // вычисляем НДС
            InvoiceToDispatch.nds = +((+value * 20) / 120).toFixed(2);
        }
        InvoiceToDispatch[prop] = value;
        dispatch(updateInvoice(InvoiceToDispatch, table, index.toString()));
    };

    const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            switchInput();
            return setValue(ChangeEvent.target.value);
        }
    };

    return [getValue, keyDown] as const;
};
