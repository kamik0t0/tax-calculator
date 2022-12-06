import { Checkbox, TableCell } from "@mui/material";
import { useEmployeeSelectors } from "../../exports/hooks";
import React from "react";
import { ISalary } from "../../exports/interfaces";

const CivilContractCheck: React.FC<{
    employeeSalary: ISalary;
    table: string;
    index: number;
}> = ({ employeeSalary }) => {
    const { selectEmployeeById } = useEmployeeSelectors();
    const employee = selectEmployeeById(employeeSalary.employeeId);
    return (
        <TableCell variant="body" width={40} align="center">
            <Checkbox
                size="small"
                checked={employee?.civilContract || false}
                disabled
            />
        </TableCell>
    );
};

export default CivilContractCheck;
