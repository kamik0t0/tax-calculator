import { Checkbox, TableBody, TableRow } from "@mui/material";
import React, { FC } from "react";
import { toRU } from "../../../helpers/currencyFormat";
import { useTypedDispatch } from "../../../redux/hooks/hooks";
import {
    deleteRow as deleteTableRow,
    setCheckBox,
} from "../../../redux/reducers/salary/salary-reducer";
import RemoveRow from "../../../shared/RemoveRow";
import { ISalary } from "../interfaces/ISalary";
import Cell from "./Cell";

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
                            checked={employeeSalary.checked}
                            onChange={() => dispatch(setCheckBox(index, table))}
                            sx={{ marginTop: 1 }}
                        />
                        <Cell
                            salary={salary}
                            table={table}
                            index={index}
                            prop="number"
                            type="string"
                            inputMode="text"
                            disabled={true}
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
                        >
                            {employeeSalary.insurance.total}
                        </Cell>
                        <RemoveRow action={deleteRow} index={index} />
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};
export default TableContent;
