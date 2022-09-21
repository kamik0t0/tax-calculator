import { useLocalStorage } from "@customhooks/useLocalStorage";
import { cellValueDisplayFormat } from "@helpers/cellValueDisplayFormat";
import {
    Icon,
    IconButton,
    Input,
    MenuItem,
    Select,
    SelectChangeEvent,
    TableCell,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    setEmployees,
    setEmployeesToStorage,
    updateSalary,
} from "@salarystore/salary-reducer";
import React, { FC, useEffect, useState } from "react";
import { EmployeeDialog } from "../exports/components";
import { useCellValue } from "../exports/hooks";
import { arrayComparsion } from "../exports/scripts";
import { IEmployee } from "../types/salary";

const Cell: FC<{
    children: string | number;
    table: string;
    index: number;
    prop: string;
    type?: string;
    inputMode?: "text" | "numeric" | "decimal" | undefined;
    step?: number;
    defaultEmployeeId?: string;
    min?: number;
    width: number;
    disabled: boolean;
}> = ({
    defaultEmployeeId,
    children,
    table,
    index,
    type,
    inputMode,
    prop,
    disabled,
    step,
    width,
    min,
}) => {
    // стейты
    const dispatch = useTypedDispatch();
    const { months, employees } = useTypedSelector(
        (state) => state.salarySlice
    );
    const employee = employees.find(
        (employee) => employee.id === defaultEmployeeId
    );
    const [open, setOpen] = useState<boolean>(false);
    const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>();
    const [inputToggle, switchInput] = useState<boolean>(false);
    const [select, setSelect] = useState<boolean>(false);
    const [employeeId, setEmployeeId] = useState<string>(
        defaultEmployeeId || ""
    );
    // обработчики
    const openDialog = () => setOpen(true);
    const editDialog = () => setOpen(true);
    const handleSwitchInput = () => {
        setSelect(!select);
        switchInput(!inputToggle);
    };
    const handleSelectValue = (event: SelectChangeEvent<string>) => {
        setEmployeeId(event.target.value);
        dispatch(
            updateSalary(event.target.value, table, index.toString(), prop)
        );
    };
    const setToTable = () => handleSwitchInput();
    // кастомные хуки
    const watchedEmployees = useLocalStorage(
        "employees",
        employees,
        setEmployees,
        setEmployeesToStorage
    );

    const [getValue, keyDown] = useCellValue(
        index,
        prop,
        table,
        handleSwitchInput,
        months[table].salary[index]
    );
    // преобразования
    const cellDisplayValue = cellValueDisplayFormat(type, children);
    const stepValue = step ? step : 0.01;

    useEffect(() => {
        const filtered = arrayComparsion(
            watchedEmployees,
            months[table].salary
        );

        setFilteredEmployees(filtered);
    }, [watchedEmployees, months]);

    return (
        <>
            {!disabled && inputToggle ? (
                <TableCell
                    align="center"
                    sx={{
                        height: 31,
                        width: width,
                    }}
                >
                    {type === "select" && select ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItmes: "center",
                            }}
                        >
                            <Select
                                size="small"
                                value={employeeId}
                                onChange={handleSelectValue}
                                sx={{ width: width, height: 29, mr: 2 }}
                            >
                                <MenuItem value={defaultEmployeeId} disabled>
                                    {children}
                                </MenuItem>
                                {filteredEmployees &&
                                    filteredEmployees.map((employee) => (
                                        <MenuItem value={employee.id}>
                                            {employee.surname +
                                                " " +
                                                employee.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <IconButton
                                color="primary"
                                aria-label="add"
                                sx={{ padding: 0.4 }}
                                onClick={openDialog}
                            >
                                <Icon color="primary" fontSize="medium">
                                    add_circle
                                </Icon>
                            </IconButton>
                            <IconButton
                                color="primary"
                                aria-label="add"
                                sx={{ padding: 0.4 }}
                                onClick={editDialog}
                            >
                                <Icon color="primary" fontSize="medium">
                                    edit
                                </Icon>
                            </IconButton>
                            <IconButton
                                color="primary"
                                aria-label="add"
                                sx={{ padding: 0.4 }}
                                onClick={setToTable}
                            >
                                <Icon color="success" fontSize="medium">
                                    check_circle
                                </Icon>
                            </IconButton>
                        </Box>
                    ) : (
                        <Input
                            autoFocus={inputToggle}
                            onBlur={handleSwitchInput}
                            onChange={getValue}
                            onKeyDown={keyDown}
                            value={children}
                            type={type}
                            inputMode={inputMode}
                            disabled={disabled}
                            inputProps={{ step: stepValue, min: min }}
                            sx={{
                                width: width,
                                height: 29,
                            }}
                        />
                    )}
                </TableCell>
            ) : (
                <TableCell
                    onClick={handleSwitchInput}
                    align="center"
                    sx={{
                        "&:hover": { cursor: "pointer" },
                        height: 31,
                        width: width,
                    }}
                >
                    <Typography>
                        {prop === "childrenQtty" ? children : cellDisplayValue}
                    </Typography>
                </TableCell>
            )}
            <EmployeeDialog
                open={open}
                setOpen={setOpen}
                currentEmployee={employee}
                table={table}
                index={index}
                prop={prop}
            />
        </>
    );
};

export default Cell;
