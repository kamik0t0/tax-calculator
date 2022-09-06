import {
    CaseReducer,
    createSlice,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    current,
} from "@reduxjs/toolkit";
import { IInvoice, IInvoices } from "../../interfaces/IInvoice";
import { calcSummary } from "../scripts/invoiceCalculations";
import { initialState } from "./invoice-initial";

type State = number;

export const incrementReducer: CaseReducer<State, PayloadAction<number>> = (
    state,
    action
) => (state += action.payload);

export const counterReducer = createSlice({
    name: "counter",
    initialState: 0,
    reducers: { incrementReducer },
});

export const increment = counterReducer.actions.incrementReducer;

// export default counterReducer.reducer;

// __________________________________________________________________

// interface GenericState {
//     data: IInvoices;
// }

// type testType<T, Reducers extends SliceCaseReducers<IInvoices>> = {
//     name: string;
//     initialState: IInvoices;
//     reducers: ValidateSliceCaseReducers<IInvoices, Reducers>;
// };

// export const createGenericSlice = <
//     T,
//     Reducers extends SliceCaseReducers<IInvoices>
// >({
//     name = "",
//     initialState,
//     reducers,
// }: testType<T, Reducers>) => {
//     return createSlice({
//         name,
//         initialState,
//         reducers: {
//             // start(state) {
//             //     state.status = "loading";
//             // },
//             success(
//                 state: IInvoices,
//                 action: PayloadAction<number, string, { table: string }>
//             ) {
//                 state.data = action.payload;
//                 const { table } = action.meta;
//                 calcSummary(state, state.summary[table], state[table]);
//                 localStorage.setItem(table, JSON.stringify(state[table]));
//             },
//             ...reducers,
//         },
//     });
// };

// const wrappedSlice = createGenericSlice({
//     name: "test",
//     initialState,
//     reducers: {
//         magic(state) {
//             state.data = "hocus pocus";
//         },
//         addRowReducer: {
//             reducer(
//                 state: IInvoices,
//                 action: PayloadAction<IInvoice, string, { table: string }>
//             ) {
//                 const { table } = action.meta;
//                 state[table].push(action.payload);
//                 localStorage.setItem(table, JSON.stringify(state[table]));
//             },
//             prepare(payload: IInvoice, table: string) {
//                 return { payload, meta: { table } };
//             },
//         },
//     },
// });

// interface GenericState {
//     data: IInvoices;
//     // status: "loading" | "finished" | "error";
// }

const createGenericSlice = <Reducers extends SliceCaseReducers<IInvoices>>({
    name = "",
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
            success(state: IInvoices, action: PayloadAction<IInvoice[]>) {
                console.log(current(state));
                console.log(action);

                state.data = action.payload;
            },
            ...reducers,
        },
    });
};

const wrappedSlice = createGenericSlice({
    name: "test",
    initialState,
    reducers: {
        magic(state: IInvoices, action: PayloadAction<IInvoice[]>) {
            console.log(current(state));
            console.log(action);
        },
    },
});

export const { magic, success } = wrappedSlice.actions;

export const { reducer } = wrappedSlice;
