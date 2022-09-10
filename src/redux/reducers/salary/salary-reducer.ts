import {
    createSlice,
    current,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { ISalaries } from "../../../pages/salary-tax/interfaces/ISalary";
import * as SalaryReducers from "./salary-cases";
import { initialState } from "./salary-initial";
import { calcSalarySummary } from "./scripts/calculateTaxes";

const createGenericSlice = <Reducers extends SliceCaseReducers<ISalaries>>({
    name = "salaries",
    initialState,
    reducers,
}: {
    name: string;
    initialState: ISalaries;
    reducers: ValidateSliceCaseReducers<ISalaries, Reducers>;
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            addRow: SalaryReducers.addRowReducer(),
            deleteRow: SalaryReducers.deleteRowReducer(),
            setCheckBox: SalaryReducers.setCheckBoxReducer(),
            updateSalaries: SalaryReducers.updateSalariesReducer(),
            updateSalary: SalaryReducers.updateSalaryReducer(),
            deleteRows: SalaryReducers.deleteRowsReducer,
            setTaxStateRate: SalaryReducers.setSalaryTaxRateReducer,
            fillByPrevMonth: SalaryReducers.fillByPrevMonthReducer,
            ...reducers,
        },
    });
};

const wrappedSlice = createGenericSlice({
    name: "test",
    initialState,
    reducers: {
        setLocalStorage(state: ISalaries, action: PayloadAction<string>) {
            const { payload: table } = action;
            localStorage.setItem(
                table,
                JSON.stringify(state.months[table].salary)
            );
        },
        calcSummary(state: ISalaries, action: PayloadAction<string>) {
            const { payload: table } = action;
            calcSalarySummary(
                state.months[table].summary,
                state.months[table].salary
            );
        },
    },
});

export const {
    addRow,
    deleteRow,
    updateSalaries,
    setCheckBox,
    updateSalary,
    deleteRows,
    setLocalStorage,
    setTaxStateRate,
    calcSummary,
    fillByPrevMonth,
} = wrappedSlice.actions;

export const { reducer } = wrappedSlice;
