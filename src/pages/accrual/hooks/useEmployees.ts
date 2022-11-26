import { useLocalStorage } from "@customhooks/useLocalStorage";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    setEmployees,
    setEmployeesToStorage,
    updateSalary,
} from "@salarystore/salary-reducer";
import React, { useEffect, useState } from "react";
import { arrayComparsion } from "../exports/scripts";
import { IEmployee } from "../exports/interfaces";

export const useEmployees = (table: string) => {
    const dispatch = useTypedDispatch();
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

    const [filteredEmployees, setFilteredEmployees] =
        useState<IEmployee[]>(watchedEmployees);

    const getSelectValue = (employeeId: string, index: number) => {
        dispatch(updateSalary(employeeId, table, index.toString(), "employee"));
    };

    useEffect(() => {
        const filtered = arrayComparsion(
            watchedEmployees,
            months[table].salary
        );

        setFilteredEmployees(filtered);
    }, [watchedEmployees, months]);

    return [getSelectValue, filteredEmployees] as const;
};
