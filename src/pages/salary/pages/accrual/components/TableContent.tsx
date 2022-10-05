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
    setCivil,
    updateSalary,
} from "@salarystore/salary-reducer";
import InputCell from "@sharedcomponents/InputCell";
import RemoveRow from "@sharedcomponents/RemoveRow";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import React, { FC } from "react";
import { useEmployees } from "../exports/hooks";
import { ISalary } from "../exports/interfaces";
import SelectEmployeeCell from "./SelectEmployee/SelectEmployeeCell";

const TableContent: FC<{
    salary: ISalary[];
    table: string;
}> = React.memo(({ salary, table }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => {
        dispatch(deleteTableRow(index, table));
    };

    // number
    const getInputData = (
        value: string | number,
        index: number,
        prop: string
    ) => {
        if (salary[index].employeeId.length === 0)
            return dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Выберите сотрудника либо удалите строку",
                })
            );
        dispatch(
            showSuccessSnackBar({
                open: true,
                severity: "warning",
                message: "Не забудьте пересчитать взносы",
            })
        );
        dispatch(updateSalary(value, table, index.toString(), prop));
    };

    // select
    const [getSelectValue, filteredEmployees] = useEmployees(table);

    return (
        <>
            <TableBody>
                {salary.map((employeeSalary: ISalary, index: number) => (
                    <TableRow key={employeeSalary.id}>
                        <TableCell align="center">
                            <Checkbox
                                size="small"
                                checked={employeeSalary.checked}
                                onChange={() =>
                                    dispatch(setCheckBox(index, table))
                                }
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Typography>{index + 1}</Typography>
                        </TableCell>
                        <SelectEmployeeCell
                            employeeId={employeeSalary.employeeId}
                            index={index}
                            width={350}
                            selectItems={filteredEmployees}
                            getSelectValue={getSelectValue}
                        >
                            {employeeSalary.name}
                        </SelectEmployeeCell>
                        <TableCell align="center">
                            <Checkbox
                                size="small"
                                checked={employeeSalary.civilContract}
                                onChange={() =>
                                    dispatch(setCivil(index, table))
                                }
                            />
                        </TableCell>
                        <InputCell
                            width={100}
                            index={index}
                            type="number"
                            prop="accrued"
                            getInputData={getInputData}
                            isMoney={true}
                        >
                            {employeeSalary.accrued}
                        </InputCell>
                        <TableCell align="center">
                            <Typography>
                                {toRU.format(employeeSalary.pay)}
                            </Typography>
                        </TableCell>
                        <InputCell
                            width={60}
                            index={index}
                            type="number"
                            prop="childrenQtty"
                            step={1}
                            getInputData={getInputData}
                        >
                            {employeeSalary.childrenQtty}
                        </InputCell>
                        <TableCell align="center">
                            <Typography>
                                {toRU.format(+employeeSalary.tax.toFixed())}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography>
                                {toRU.format(employeeSalary.insuranceTotal)}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <RemoveRow action={deleteRow} index={index} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
});
export default TableContent;
