import { formatDisplayedValue } from "@helpers/formatDisplayedValue";
import {
    Icon,
    IconButton,
    Input,
    MenuItem,
    Select,
    TableCell,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTypedSelector } from "@reduxhooks/hooks";
import React, { FC, useState } from "react";
import { useEmployees, useInputValue } from "../exports/hooks";

const Cell: FC<{
    children: any;
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
}> = React.memo(
    ({
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
        const { months } = useTypedSelector((state) => state.salarySlice);
        const accrual = months[table].salary[index];
        // переключение select/cell
        const [select, setSelect] = useState<boolean>(false);

        const [handleSelectValue, filteredEmployees, employee, openDialog] =
            useEmployees(index, prop, table, defaultEmployeeId);

        const [getValue, keyDownHandler, inputToggle, handleSwitchInput] =
            useInputValue(
                index,
                prop,
                table,
                accrual,
                children,
                disabled,
                setSelect,
                select
            );
        // форматирования
        const cellDisplayValue = formatDisplayedValue(type, children);
        const stepValue = step ? step : 0.01;
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
                                    onChange={handleSelectValue}
                                    sx={{
                                        width: width - 100,
                                        height: 29,
                                        mr: 2,
                                    }}
                                    value={employee?.id || ""}
                                >
                                    <MenuItem value={employee?.id} disabled>
                                        {children}
                                    </MenuItem>
                                    {filteredEmployees &&
                                        filteredEmployees.map((employee) => (
                                            <MenuItem
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.surname +
                                                    " " +
                                                    employee.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                                {employee ? (
                                    <IconButton
                                        color="primary"
                                        aria-label="add"
                                        sx={{ padding: 0.4 }}
                                        onClick={openDialog}
                                    >
                                        <Icon color="primary" fontSize="medium">
                                            edit
                                        </Icon>
                                    </IconButton>
                                ) : (
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
                                )}

                                <IconButton
                                    color="primary"
                                    aria-label="add"
                                    sx={{ padding: 0.4 }}
                                    onClick={handleSwitchInput}
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
                                onKeyDown={keyDownHandler}
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
                            {prop === "childrenQtty"
                                ? children
                                : cellDisplayValue}
                        </Typography>
                    </TableCell>
                )}
            </>
        );
    }
);

export default Cell;
