import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IFinesData } from "../exports/types";

const finesAdapter = createEntityAdapter<IFinesData>();

export const finesDataSelectors = finesAdapter.getSelectors();

const finesCalculationsSlice = createSlice({
    name: "fines",
    initialState: finesAdapter.getInitialState(),
    reducers: {
        setFines: finesAdapter.setAll,
    },
});

export const { setFines } = finesCalculationsSlice.actions;
export const { reducer } = finesCalculationsSlice;
