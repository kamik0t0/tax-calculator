import {
    createEntityAdapter,
    createSlice,
    nanoid,
    PayloadAction,
} from "@reduxjs/toolkit";
import store from "redux/store";
import { IFines, IFinesProps, IFinesData } from "../exports/types";

const finesAdapter = createEntityAdapter<IFinesData>();

type RootState = ReturnType<typeof store.getState>;

// export const finesDataSelectors = finesAdapter.getSelectors<RootState>(
//     (state) => state.fineSliceTest
// );

const props: IFinesProps = {
    id: "",
    debt: 0,
    dueDate: 0,
    payDate: 0,
    debtorType: "org",
    fineSumm: 0,
    days: 0,
    isError: false,
};

const finesCalculationsSlice = createSlice({
    name: "fines",
    initialState: finesAdapter.getInitialState(props),
    reducers: {
        setFines(state, action: PayloadAction<IFinesProps>) {
            const {
                id,
                debt,
                dueDate,
                payDate,
                debtorType,
                fineSumm,
                days,
                isError,
            } = action.payload;
            state.id = id;
            state.debt = debt;
            state.dueDate = dueDate;
            state.payDate = payDate;
            state.debtorType = debtorType;
            state.fineSumm = fineSumm;
            state.days = days;
            state.isError = isError;
        },
    },
});

export const { setFines } = finesCalculationsSlice.actions;
export const { reducer } = finesCalculationsSlice;
