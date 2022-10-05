import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { IEmployee } from "../../types/salary";

const SelectEmployee: React.FC<{
    children: string;
    employees: IEmployee[];
    employeeId: string;
    width: number;
    onChange: (event: SelectChangeEvent<string>) => void;
}> = ({ children, employees, employeeId, width, onChange }) => {
    return (
        <Select
            onChange={onChange}
            sx={{
                width: width - 100,
                height: 29,
                mr: 2,
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
