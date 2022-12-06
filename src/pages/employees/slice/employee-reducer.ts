import { createEntityAdapter, createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { IEmployee } from "../exports/types";

export const employeeAdapter = createEntityAdapter<IEmployee>({
    selectId: (employee) => employee.id,
});

export const employeeSelectors = employeeAdapter.getSelectors<RootState>(
    (state) => state.employee
);

const employeeSlice = createSlice({
    name: "employee",
    initialState: employeeAdapter.getInitialState(),
    reducers: {
        setEmployees(state, action) {
            employeeAdapter.setAll(state, action.payload);
        },
        addEmployee: employeeAdapter.addOne,
        updateEmployee: employeeAdapter.updateOne,
        deleteEmployee: employeeAdapter.removeOne,
    },
});

export const { setEmployees, addEmployee, updateEmployee, deleteEmployee } =
    employeeSlice.actions;
export const { reducer } = employeeSlice;
