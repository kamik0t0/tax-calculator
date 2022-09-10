import { PayloadAction } from "@reduxjs/toolkit";
import { IPropSignature } from "../../../interfaces/IPropSignature";

export const setCheckBoxReducer = <S extends IPropSignature>(
    sliceState: S
) => ({
    reducer(
        state: S = sliceState,
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

export const addRowReducer = <S extends IPropSignature>(sliceState: S) => {
    return {
        reducer(
            state: S = sliceState,
            action: PayloadAction<object, string, { table: string }>
        ) {
            const { table } = action.meta;
            state[table].push(action.payload);
        },
        prepare(payload: Object, table: string) {
            return { payload, meta: { table } };
        },
    };
};

export const deleteRowReducer = <S extends IPropSignature>(sliceState: S) => ({
    reducer(
        state: S = sliceState,
        action: PayloadAction<number, string, { table: string }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state[table as S[string]] = state[table].filter(
            (_: never, i: number) => i !== index
        );
    },
    prepare(payload: number, table: string) {
        return { payload, meta: { table } };
    },
});
