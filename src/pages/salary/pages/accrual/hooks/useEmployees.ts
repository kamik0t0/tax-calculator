import { useLocalStorage } from "@customhooks/useLocalStorage";
import { SelectChangeEvent } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    setEmployeeById,
    setEmployees,
    setEmployeesToStorage,
    updateSalary,
} from "@salarystore/salary-reducer";
import React, { useEffect, useState } from "react";
import { setDialogEmployee } from "@dialogstore/dialog-reducer";
import { arrayComparsion } from "../exports/scripts";
import { IEmployee } from "../types/salary";

export const useEmployees = (
    index: number,
    prop: string,
    table: string,
    defaultEmployeeId: string | undefined
) => {
    const dispatch = useTypedDispatch();
    const openDialog = () => {
        dispatch(setEmployeeById(defaultEmployeeId || ""));
        dispatch(setDialogEmployee(true));
    };
    const { months, employees } = useTypedSelector(
        (state) => state.salarySlice
    );
    // привязка localStorage к стейту сотрудников
    const watchedEmployees = useLocalStorage(
        "employees",
        employees,
        setEmployees,
        setEmployeesToStorage
    );
    // стейт фильтрованных сотрудников
    const [filteredEmployees, setFilteredEmployees] =
        useState<IEmployee[]>(watchedEmployees);
    // определяется сотрудник по которому изменяются начисления
    const employee = watchedEmployees.find(
        (employee) => employee.id === defaultEmployeeId
    );

    const handleSelectValue = (event: SelectChangeEvent<string>) => {
        const employeeId = event.target.value;
        dispatch(updateSalary(employeeId, table, index.toString(), prop));
    };

    useEffect(() => {
        const filtered = arrayComparsion(
            watchedEmployees,
            months[table].salary
        );

        setFilteredEmployees(filtered);
    }, [watchedEmployees, months]);

    return [
        handleSelectValue,
        filteredEmployees,
        employee,
        openDialog,
    ] as const;
};
