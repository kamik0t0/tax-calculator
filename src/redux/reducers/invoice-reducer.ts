import {
    createSlice,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { IInvoices } from "../../interfaces/IInvoice";
import { calcSummary as calculateSummary } from "../scripts/invoiceCalculations";
import * as Reducers from "./invoice-cases";
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
            addRow: Reducers.addRowReducer(),
            deleteRow: Reducers.deleteRowReducer(),
            setCheckBox: Reducers.setCheckBoxReducer(),
            updateInvoices: Reducers.updateInvoicesReducer(),
            updateInvoice: Reducers.updateInvoiceReducer(),
            deleteRows: Reducers.deleteRowsReducer,
            ...reducers,
        },
    });
};

const wrappedSlice = createGenericSlice({
    name: "test",
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
