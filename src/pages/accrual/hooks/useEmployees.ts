import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { setEmployeeToSalaryAccrual } from "@salarystore/salary-reducer";
import React, { useEffect, useState } from "react";
import { useEmployeeSelectors } from "../exports/hooks";
import { IEmployee } from "../exports/interfaces";
import { arrayComparsion } from "../exports/scripts";
import { Months } from "../exports/utils";

export const useEmployees = (table: Months) => {
    const dispatch = useTypedDispatch();
    const { months } = useTypedSelector((state) => state.salarySlice);
    const { selectEmployees, selectEmployeeById } = useEmployeeSelectors();
    const employees = selectEmployees();

    const [filteredEmployees, setFilteredEmployees] =
        useState<IEmployee[]>(employees);

    const getSelectValue = (employeeId: string, index: number) => {
        const employee = selectEmployeeById(employeeId);
        employee &&
            dispatch(setEmployeeToSalaryAccrual(employee, table, index));
    };

    useEffect(() => {
        const filtered = arrayComparsion(employees, months[table].salary);
        setFilteredEmployees(filtered);
    }, [employees, months]);

    return [getSelectValue, filteredEmployees] as const;
};
