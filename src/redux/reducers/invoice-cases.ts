import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoices } from "../../interfaces/IInvoice";

export const deleteRowsReducer: CaseReducer<
    IInvoices,
    PayloadAction<string>
> = (state, action) => {
    const table = action.payload;
    state[table] = state[table].filter((invoice: IInvoice) => !invoice.checked);
};

export const addRowReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<IInvoice, string, { table: string }>
    ) {
        const { table } = action.meta;
        state[table].push(action.payload);
    },
    prepare(payload: IInvoice, table: string) {
        return { payload, meta: { table } };
    },
});

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

export const updateInvoicesReducer = <T>() => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<T[], string, { table: string }>
    ) {
        const { table } = action.meta;
        state[table] = action.payload;
    },
    prepare(payload: T[], table: string) {
        return { payload, meta: { table } };
    },
});

export const updateInvoiceReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<
            IInvoice,
            string,
            { table: string; index: string }
        >
    ) {
        const index = +action.meta.index;
        const { table } = action.meta;
        state[table][index] = action.payload;
    },
    prepare(payload: IInvoice, table: string, index: string) {
        return { payload, meta: { table, index } };
    },
});

export const setCheckBoxReducer = () => ({
    reducer(
        state: IInvoices,
        action: PayloadAction<number, string, { table: string }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state[table][index].checked = !state.sales[index].checked;
    },
    prepare(payload: number, table: string) {
        return { payload, meta: { table } };
    },
});
