import { Checkbox, TableCell } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { ISalary } from "../types/salary";

const CivilContractCheck: React.FC<{
    employeeSalary: ISalary;
    table: string;
    index: number;
}> = ({ employeeSalary, table, index }) => {
    const { employees } = useTypedSelector((state) => state.salarySlice);

    const employee = employees.find(
        (employee) => employee.id === employeeSalary.employeeId
    );

    return (
        <TableCell align="center">
            <Checkbox
                size="small"
                checked={employee?.civilContract || false}
                disabled
            />
        </TableCell>
    );
};

export default CivilContractCheck;