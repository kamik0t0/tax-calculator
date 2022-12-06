import {
    createSlice,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { ISalaries, ISalary } from "../exports/interfaces";
import * as SalaryReducers from "./salary-cases";
import { initialState } from "./salary-initial";

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
            setEmployeeToSalaryAccrual:
                SalaryReducers.setEmployeeToSalaryAccrualReducer(),
            deleteRows: SalaryReducers.deleteRowsReducer,
            setTaxStateRate: SalaryReducers.setSalaryTaxRateReducer(),
            fillByPrevMonth: SalaryReducers.fillByPrevMonthReducer,
            setSalaryDistrictCoeff:
                SalaryReducers.setSalaryDistrictCoeffReducer,
            setMinimalSalary: SalaryReducers.setMinimalSalaryReducer,
            updateEmployeesInSalaries:
                SalaryReducers.updateEmployeesInSalariesReducer(),
            ...reducers,
        },
    });
};

const wrappedSlice = createGenericSlice({
    name: "test",
    initialState,
    reducers: {
        calcSummary(state: ISalaries, action: PayloadAction<string>) {
            const { payload: table } = action;
            const salary: ISalary[] = state.months[table].salary;

            state.months[table].summary.accruedTotal = salary.reduce(
                (acc, current) => acc + current.accrued,
                0
            );
            state.months[table].summary.insuranceTotal = salary.reduce(
                (acc, current) => acc + current.insuranceTotal,
                0
            );

            state.months[table].summary.payTotal = salary.reduce(
                (acc, current) => acc + current.pay,
                0
            );
            state.months[table].summary.taxTotal = salary.reduce(
                (acc, current) => acc + current.tax,
                0
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
    setEmployeeToSalaryAccrual,
    deleteRows,
    setTaxStateRate,
    calcSummary,
    fillByPrevMonth,
    setSalaryDistrictCoeff,
    setMinimalSalary,
    updateEmployeesInSalaries,
} = wrappedSlice.actions;

export const { reducer } = wrappedSlice;
