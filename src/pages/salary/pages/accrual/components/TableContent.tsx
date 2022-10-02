import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import {
    deleteRow as deleteTableRow,
    setCheckBox,
} from "@salarystore/salary-reducer";
import RemoveRow from "@sharedcomponents/RemoveRow";
import React, { FC } from "react";
import { Cell } from "../exports/components";
import { ISalary } from "../exports/interfaces";

const TableContent: FC<{
    salary: ISalary[];
    table: string;
}> = React.memo(({ salary, table }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => {
        dispatch(deleteTableRow(index, table));
    };

    return (
        <>
            <TableBody>
                {salary.map((employeeSalary: ISalary, index: number) => (
                    <TableRow key={employeeSalary.id}>
                        <Cell
                            table={table}
                            index={index}
                            prop="number"
                            type="string"
                            inputMode="text"
                            disabled={true}
                            width={0}
                        >
                            <Checkbox
                                size="small"
                                checked={employeeSalary.checked}
                                onChange={() =>
                                    dispatch(setCheckBox(index, table))
                                }
                            />
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="number"
                            type="string"
                            inputMode="text"
                            disabled={true}
                            width={0}
                        >
                            {index + 1}
                        </Cell>
                        <Cell
                            defaultEmployeeId={employeeSalary.employeeId}
                            table={table}
                            index={index}
                            prop="employee"
                            type="select"
                            inputMode="text"
                            disabled={false}
                            width={350}
                        >
                            {employeeSalary.name}
                        </Cell>

                        <Cell
                            table={table}
                            index={index}
                            prop="accrued"
                            type="number"
                            inputMode="decimal"
                            disabled={false}
                            width={100}
                            min={0}
                        >
                            {employeeSalary.accrued}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="pay"
                            type="number"
                            disabled={true}
                            width={0}
                        >
                            {employeeSalary.pay}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="childrenQtty"
                            type="number"
                            inputMode="numeric"
                            disabled={false}
                            step={1}
                            width={60}
                            min={0}
                        >
                            {employeeSalary.childrenQtty}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="tax"
                            type="number"
                            disabled={true}
                            width={0}
                        >
                            {employeeSalary.tax}
                        </Cell>
                        <Cell
                            table={table}
                            index={index}
                            prop="insurance"
                            type="number"
                            disabled={true}
                            width={0}
                        >
                            {employeeSalary.insuranceTotal}
                        </Cell>
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
