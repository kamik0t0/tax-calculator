import {
    createSlice,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { IInvoices } from "../exports/interfaces";
import * as InvoiceReducers from "./invoice-cases";
import { initialState } from "./invoice-initial";
import { calcSummary as calculateSummary } from "../exports/scripts";

const createGenericSlice = <Reducers extends SliceCaseReducers<IInvoices>>({
    name = "invoices",
    initialState,
    reducers,
}: {
    name: string;
    initialState: IInvoices;
    reducers: ValidateSliceCaseReducers<IInvoices, Reducers>;
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            addRow: InvoiceReducers.addRowReducer(),
            deleteRow: InvoiceReducers.deleteRowReducer(),
            setCheckBox: InvoiceReducers.setCheckBoxReducer(),
            updateInvoices: InvoiceReducers.updateInvoicesReducer(),
            updateInvoice: InvoiceReducers.updateInvoiceReducer(),
            deleteRows: InvoiceReducers.deleteRowsReducer,
            ...reducers,
        },
    });
};

const wrappedSlice = createGenericSlice({
    name: "wrappedInvoices",
    initialState,
    reducers: {
        setLocalStorage(state: IInvoices, action: PayloadAction<string>) {
            const { payload: table } = action;
            localStorage.setItem(table, JSON.stringify(state[table]));
        },
        calcSummary(state: IInvoices, action: PayloadAction<string>) {
            const { payload: table } = action;
            calculateSummary(state, state.summary[table], state[table]);
        },
    },
});

export const {
    addRow,
    deleteRow,
    updateInvoices,
    setCheckBox,
    updateInvoice,
    deleteRows,
    setLocalStorage,
    calcSummary,
} = wrappedSlice.actions;

export const { reducer } = wrappedSlice;
