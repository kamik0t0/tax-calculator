import {
    createSlice,
    current,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { IInvoices } from "../exports/interfaces";
import { calcSummary as calculateSummary } from "../exports/scripts";
import * as InvoiceReducers from "./invoice-cases";
import { initialState } from "./invoice-initial";

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
            updateInvoice: InvoiceReducers.updateInvoiceReducer,
            deleteRows: InvoiceReducers.deleteRowsReducer,
            ...reducers,
        },
    });
};

const wrappedSlice = createGenericSlice({
    name: "wrappedInvoices",
    initialState,
    reducers: {
        calcSummary(state: IInvoices, action: PayloadAction<string>) {
            const { payload: table } = action;
            const [summ, nds, finalNDS] = calculateSummary(state, state[table]);

            state.summary[table].summ = summ;
            state.summary[table].nds = nds;
            state.summary.nds = finalNDS;
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
    calcSummary,
} = wrappedSlice.actions;

export const { reducer } = wrappedSlice;
