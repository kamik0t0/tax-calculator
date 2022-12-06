import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { setEmployeeId } from "@dialogstore/dialog-reducer";
import { useEmployeeStorageSelector } from "../../../App";
import { employeeSelectors } from "../slice/employee-reducer";
import { store } from "@store/store";

const EmployeesList: React.FC = () => {
    const dispatch = useTypedDispatch();
    const { employeeId } = useTypedSelector((state) => state.dialogSlice);
    const employee = employeeSelectors.selectById(
        store.getState(),
        employeeId || ""
    );

    const employees = useEmployeeStorageSelector();
    const handleSelectEmployee = (event: SelectChangeEvent<string>) => {
        const employeeId = event.target.value;
        dispatch(setEmployeeId(employeeId));
    };
    return (
        <FormControl sx={{ mb: 3 }}>
            <InputLabel id="demo-simple-select-label">Сотрудник</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employee?.id || ""}
                label="Сотрудник"
                onChange={handleSelectEmployee}
                sx={{
                    width: 250,
                }}
            >
                {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                        {employee.surname + " " + employee.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default EmployeesList;
