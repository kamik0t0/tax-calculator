import { CaseReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoices, InvoiceConstructor } from "../exports/interfaces";
import { Invoice } from "../exports/scripts";

export const updateInvoicesReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<IInvoice[], string, { table: string }>
    ) {
        const { table } = action.meta;
        state[table] = action.payload;
    },
    prepare(payload: IInvoice[], table: string) {
        return { payload, meta: { table } };
    },
});

export const updateInvoiceReducer: CaseReducer<
    IInvoices,
    PayloadAction<InvoiceConstructor>
> = (state, action) => {
    const { value, prop, index, table } = action.payload;
    const invoices = state[table];
    state[table][index] = new Invoice(value, prop, invoices, index).create();
};

export const deleteRowsReducer: CaseReducer<IInvoices, PayloadAction<string>> =
    (state, action) => {
        const table = action.payload;
        state[table] = state[table].filter(
            (invoice: IInvoice) => !invoice.checked
        );
    };

export const setCheckBoxReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<number, string, { table: string }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state[table][index].checked = !state[table][index].checked;
    },
    prepare(payload: number, table: string) {
        return { payload, meta: { table } };
    },
});

export const addRowReducer = () => {
    return {
        reducer(
            state: IInvoices,
            action: PayloadAction<object, string, { table: string }>
        ) {
            const { table } = action.meta;
            state[table].push(action.payload);
        },
        prepare(payload: IInvoice, table: string) {
            return { payload, meta: { table } };
        },
    };
};

export const deleteRowReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<number, string, { table: string }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state[table] = state[table].filter(
            (_: never, i: number) => i !== index
        );
    },
    prepare(payload: number, table: string) {
        return { payload, meta: { table } };
    },
});
