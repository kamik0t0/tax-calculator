import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IFines, IFinesData } from "../exports/types";

const finesAdapter = createEntityAdapter<IFines>();

export const finesDataSelectors = finesAdapter.getSelectors();

const finesSlice = createSlice({
    name: "fines",
    initialState: finesAdapter.getInitialState(),
    reducers: {
        setFines: finesAdapter.setAll,
    },
});

export const { setFines } = finesSlice.actions;
export const { reducer } = finesSlice;
