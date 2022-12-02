import { useLocalStorage } from "@customhooks/useLocalStorage";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { setEmployeeById, setEmployees } from "@salarystore/salary-reducer";
import React from "react";

const EmployeesList: React.FC = (props) => {
    const dispatch = useTypedDispatch();
    const { employees, employee } = useTypedSelector(
        (state) => state.salarySlice
    );
    const watchedEmployees = useLocalStorage(
        "employees",
        employees,
        setEmployees
    );

    const handleSelectEmployee = (event: SelectChangeEvent<string>) => {
        const employeeId = event.target.value;
        dispatch(setEmployeeById(employeeId));
    };
    return (
        <FormControl sx={{ mb: 3 }}>
            <InputLabel id="demo-simple-select-label">Сотрудник</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employee.id || ""}
                label="Сотрудник"
                onChange={handleSelectEmployee}
                sx={{
                    width: 250,
                }}
            >
                {watchedEmployees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                        {employee.surname + " " + employee.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default EmployeesList;
