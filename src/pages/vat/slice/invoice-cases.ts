import { CaseReducer, current, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoices } from "../exports/interfaces";
import {
    InvoiceRate,
    InvoiceNDS,
    InvoiceSumm,
    InvoiceNum,
    InvoiceDate,
    InvoiceClient,
    // InvoiceCheck,
} from "../exports/scripts";

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

export const updateInvoiceSummReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<number, string, { table: string; index: number }>
    ) {
        const { index, table } = action.meta;
        const summ = action.payload;
        const invoices = state[table];
        state[table][index] = new InvoiceSumm(invoices, index).createWith(summ);
    },
    prepare(payload: number, table: string, index: number) {
        return { payload, meta: { table, index } };
    },
});

export const updateInvoiceRateReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<number, string, { table: string; index: number }>
    ) {
        const { index, table } = action.meta;
        const rate = action.payload;
        console.log(rate);

        const invoices = state[table];
        state[table][index] = new InvoiceRate(invoices, index).createWith(rate);
    },
    prepare(payload: number, table: string, index: number) {
        return { payload, meta: { table, index } };
    },
});

export const updateInvoiceDateReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<number, string, { table: string; index: number }>
    ) {
        const { index, table } = action.meta;
        const date = action.payload;
        const invoices = state[table];
        state[table][index] = new InvoiceDate(invoices, index).createWith(date);
    },
    prepare(payload: number, table: string, index: number) {
        return { payload, meta: { table, index } };
    },
});

export const updateInvoiceNumReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<string, string, { table: string; index: number }>
    ) {
        const { index, table } = action.meta;
        const num = action.payload;
        const invoices = state[table];
        state[table][index] = new InvoiceNum(invoices, index).createWith(num);
    },
    prepare(payload: string, table: string, index: number) {
        return { payload, meta: { table, index } };
    },
});

export const updateInvoiceClientReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<string, string, { table: string; index: number }>
    ) {
        const { index, table } = action.meta;
        const cl = action.payload;
        const invoices = state[table];
        state[table][index] = new InvoiceClient(invoices, index).createWith(cl);
    },
    prepare(payload: string, table: string, index: number) {
        return { payload, meta: { table, index } };
    },
});

export const updateInvoiceNDSReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<number, string, { table: string; index: number }>
    ) {
        const { index, table } = action.meta;
        const nds = action.payload;
        const invoices = state[table];
        state[table][index] = new InvoiceNDS(invoices, index).createWith(nds);
    },
    prepare(payload: number, table: string, index: number) {
        return { payload, meta: { table, index } };
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
