import { toRU } from "@helpers/currencyFormat";
import {
    Checkbox,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import {
    deleteRow as deleteTableRow,
    setCheckBox,
} from "@salarystore/salary-reducer";
import InputCell from "@sharedcomponents/InputCell";
import RemoveRow from "@sharedcomponents/RemoveRow";
import React, { FC } from "react";
import {
    CivilContractCheck,
    SelectEmployeeCell,
} from "../../exports/components";
import { useEmployees } from "../../exports/hooks";
import { ISalary } from "../../exports/interfaces";
import { useSalaryData } from "../../exports/hooks";
import { Months } from "../../../../pages/accrual/exports/utils";

const TableContent: FC<{
    salary: ISalary[];
    table: Months;
}> = React.memo(({ salary, table }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => {
        dispatch(deleteTableRow(index, table));
    };
    const getInputData = useSalaryData(salary, table);
    // TODO: Context
    const [getSelectValue, filteredEmployees] = useEmployees(table);

    return (
        <>
            <TableBody>
                {salary.map((employeeSalary: ISalary, index: number) => (
                    <TableRow key={employeeSalary.id}>
                        <TableCell variant="body" align="center">
                            <Checkbox
                                size="small"
                                checked={employeeSalary.checked}
                                onChange={() =>
                                    dispatch(setCheckBox(index, table))
                                }
                            />
                        </TableCell>
                        <TableCell variant="body" align="center">
                            <Typography>{index + 1}</Typography>
                        </TableCell>
                        <SelectEmployeeCell
                            employeeId={employeeSalary.employeeId}
                            index={index}
                            selectItems={filteredEmployees}
                            getSelectValue={getSelectValue}
                        >
                            {employeeSalary.name}
                        </SelectEmployeeCell>
                        <CivilContractCheck
                            employeeSalary={employeeSalary}
                            table={table}
                            index={index}
                        ></CivilContractCheck>
                        <InputCell
                            index={index}
                            type="number"
                            prop="accrued"
                            getInputData={getInputData}
                            isMoney={true}
                        >
                            {employeeSalary.accrued}
                        </InputCell>
                        <TableCell variant="body" align="center">
                            <Typography>
                                {toRU.format(employeeSalary.pay)}
                            </Typography>
                        </TableCell>
                        <InputCell
                            index={index}
                            type="number"
                            prop="childrenQtty"
                            step={1}
                            getInputData={getInputData}
                        >
                            {employeeSalary.childrenQtty}
                        </InputCell>
                        <TableCell variant="body" align="center">
                            <Typography>
                                {toRU.format(+employeeSalary.tax.toFixed())}
                            </Typography>
                        </TableCell>
                        <TableCell variant="body" align="center">
                            <Typography>
                                {toRU.format(employeeSalary.insuranceTotal)}
                            </Typography>
                        </TableCell>
                        <TableCell variant="body">
                            <RemoveRow action={deleteRow} index={index} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
});
export default TableContent;
