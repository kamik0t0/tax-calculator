import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoices } from "../../interfaces/IInvoice";

const initialState: IInvoices = {
    sales: [],
    purches: [],
    advPayIssued: [],
    advPayRecieved: [],
    summary: {
        purches: {
            summ: 0,
            nds: 0,
        },
        sales: {
            summ: 0,
            nds: 0,
        },
        advPayIssued: {
            summ: 0,
            nds: 0,
        },
        advPayRecieved: {
            summ: 0,
            nds: 0,
        },
        nds: 0,
    },
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        setSales(state, action: PayloadAction<IInvoice[]>) {
            state.sales = action.payload;
            state.summary.sales.summ = action.payload.reduce(
                (sale, current) => sale + +current.summ,
                0
            );
            state.summary.sales.nds = action.payload.reduce(
                (sale, current) => sale + +current.nds,
                0
            );
            state.summary.nds =
                state.summary.sales.nds +
                state.summary.advPayRecieved.nds -
                state.summary.purches.nds -
                state.summary.advPayIssued.nds;
            if (state.summary.nds < 0) state.summary.nds = 0;
        },
        setPurches(state, action: PayloadAction<IInvoice[]>) {
            state.purches = action.payload;
            state.summary.purches.summ = action.payload.reduce(
                (purchase, current) => purchase + +current.summ,
                0
            );
            state.summary.purches.nds = action.payload.reduce(
                (purchase, current) => purchase + +current.nds,
                0
            );
            state.summary.nds =
                state.summary.sales.nds +
                state.summary.advPayRecieved.nds -
                state.summary.purches.nds -
                state.summary.advPayIssued.nds;
            if (state.summary.nds < 0) state.summary.nds = 0;
        },
        setAdvPayRecieved(state, action: PayloadAction<IInvoice[]>) {
            state.advPayRecieved = action.payload;
            state.summary.advPayRecieved.summ = action.payload.reduce(
                (purchase, current) => purchase + +current.summ,
                0
            );
            state.summary.advPayRecieved.nds = action.payload.reduce(
                (purchase, current) => purchase + +current.nds,
                0
            );
            state.summary.nds =
                state.summary.sales.nds +
                state.summary.advPayRecieved.nds -
                state.summary.purches.nds -
                state.summary.advPayIssued.nds;
            if (state.summary.nds < 0) state.summary.nds = 0;
        },
        setAdvPayIssued(state, action: PayloadAction<IInvoice[]>) {
            state.advPayIssued = action.payload;
            state.summary.advPayIssued.summ = action.payload.reduce(
                (purchase, current) => purchase + +current.summ,
                0
            );
            state.summary.advPayIssued.nds = action.payload.reduce(
                (purchase, current) => purchase + +current.nds,
                0
            );
            state.summary.nds =
                state.summary.sales.nds +
                state.summary.advPayRecieved.nds -
                state.summary.purches.nds -
                state.summary.advPayIssued.nds;
            if (state.summary.nds < 0) state.summary.nds = 0;
        },
    },
});

export const { setSales, setPurches, setAdvPayRecieved, setAdvPayIssued } =
    invoiceSlice.actions;
export default invoiceSlice.reducer;
