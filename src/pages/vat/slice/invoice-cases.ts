import { CaseReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoices } from "../exports/interfaces";
import { calcInvoice } from "./scripts/invoiceCalculations";

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

export const updateInvoiceReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<
            string | number,
            string,
            { table: string; index: string; prop: string }
        >
    ) {
        const { index, table, prop } = action.meta;
        const value = action.payload;
        const invoices = state[table];
        const invoice = calcInvoice(value, prop, invoices, +index);
        state[table][+index] = invoice;
    },
    prepare(
        payload: string | number,
        table: string,
        index: string,
        prop: string
    ) {
        return { payload, meta: { table, index, prop } };
    },
});

export const deleteRowsReducer: CaseReducer<
    IInvoices,
    PayloadAction<string>
> = (state, action) => {
    const table = action.payload;
    state[table] = state[table].filter((invoice: IInvoice) => !invoice.checked);
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
