import { Checkbox, TableBody, TableRow } from "@mui/material";
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
}> = ({ salary, table }) => {
    const dispatch = useTypedDispatch();
    const deleteRow = (index: number) => dispatch(deleteTableRow(index, table));
    return (
        <>
            <TableBody>
                {salary.map((employeeSalary: ISalary, index: number) => (
                    <TableRow key={employeeSalary.id}>
                        <Checkbox
                            size="small"
                            checked={employeeSalary.checked}
                            onChange={() => dispatch(setCheckBox(index, table))}
                        />
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="number"
                            type="string"
                            inputMode="text"
                            disabled={true}
                            width={20}
                        >
                            {index + 1}
                        </Cell>
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="employee"
                            type="string"
                            inputMode="text"
                            disabled={false}
                            width={285}
                        >
                            {employeeSalary.employee}
                        </Cell>
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="accrued"
                            type="number"
                            inputMode="decimal"
                            disabled={false}
                            width={100}
                        >
                            {employeeSalary.accrued}
                        </Cell>
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="pay"
                            type="number"
                            disabled={true}
                            width={100}
                        >
                            {employeeSalary.pay}
                        </Cell>
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="childrenQtty"
                            type="number"
                            inputMode="numeric"
                            disabled={false}
                            step={1}
                            width={60}
                        >
                            {employeeSalary.childrenQtty}
                        </Cell>
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="tax"
                            type="number"
                            disabled={true}
                            width={100}
                        >
                            {employeeSalary.tax}
                        </Cell>
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="insurance"
                            type="number"
                            disabled={true}
                            width={100}
                        >
                            {employeeSalary.insuranceTotal}
                        </Cell>
                        <RemoveRow action={deleteRow} index={index} />
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};
export default TableContent;
