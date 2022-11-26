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
            deleteRows: SalaryReducers.deleteRowsReducer,
            addEmployee: SalaryReducers.addEmployeeReducer,
            setEmployee: SalaryReducers.setEmployeeReducer,
            updateEmployee: SalaryReducers.updateEmployeeReducer,
            setEmployees: SalaryReducers.setEmployeesReducer,
            setTaxStateRate: SalaryReducers.setSalaryTaxRateReducer,
            fillByPrevMonth: SalaryReducers.fillByPrevMonthReducer,
            setSalaryDistrictCoeff:
                SalaryReducers.setSalaryDistrictCoeffReducer,
            setMinimalSalary: SalaryReducers.setMinimalSalaryReducer,
            setEmployeeById: SalaryReducers.setEmployeeByIdReducer,
            deleteEmployee: SalaryReducers.deleteEmployeeReducer,
            updateEmployeesInSalaries:
                SalaryReducers.updateEmployeesInSalariesReducer,
            setCivil: SalaryReducers.setCivilReducer(),
            updateCivilContract: SalaryReducers.updateCivilContractReducer(),
            ...reducers,
        },
    });
};

const wrappedSlice = createGenericSlice({
    name: "test",
    initialState,
    reducers: {
        setSalariesToStorage(state: ISalaries, action: PayloadAction<string>) {
            const { payload: key } = action;
            localStorage.setItem(key, JSON.stringify(state.months[key].salary));
        },
        setEmployeesToStorage(state: ISalaries, action: PayloadAction<string>) {
            const { payload: key } = action;
            localStorage.setItem(key, JSON.stringify(state.employees));
        },
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
    deleteRows,
    addEmployee,
    setEmployee,
    updateEmployee,
    setEmployees,
    setSalariesToStorage,
    setEmployeesToStorage,
    setTaxStateRate,
    calcSummary,
    fillByPrevMonth,
    setSalaryDistrictCoeff,
    setMinimalSalary,
    setEmployeeById,
    deleteEmployee,
    updateEmployeesInSalaries,
    setCivil,
    updateCivilContract,
} = wrappedSlice.actions;

export const { reducer } = wrappedSlice;
