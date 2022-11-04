import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { IEmployee } from "../../exports/interfaces";

const SelectEmployee: React.FC<{
    children: string;
    employees: IEmployee[];
    employeeId: string;
    onChange: (event: SelectChangeEvent<string>) => void;
}> = ({ children, employees, employeeId, onChange }) => {
    return (
        <Select
            onChange={onChange}
            sx={{
                height: 29,
                mr: 2,
                maxWidth: 250,
                minWidth: 250,
            }}
            value={employeeId || ""}
        >
            <MenuItem value={employeeId} disabled>
                {children}
            </MenuItem>
            {employees &&
                employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                        {employee.surname + " " + employee.name}
                    </MenuItem>
                ))}
        </Select>
    );
};

export default SelectEmployee;
