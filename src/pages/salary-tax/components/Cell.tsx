import { TableCell, TextField } from "@mui/material";
import React, { FC } from "react";
import { useToggle } from "../../../hooks/useToggle";
import { cellValueDisplayFormat } from "../../../helpers/cellValueDisplayFormat";
import { useCellValue } from "../hooks/useCellValue";
import { ISalary } from "../interfaces/ISalary";

const Cell: FC<{
    salary: ISalary[];
    children: string | number;
    table: string;
    index: number;
    prop: string;
    type?: string;
    inputMode?: "text" | "numeric" | "decimal" | undefined;
    step?: number;
    disabled: boolean;
}> = ({ children, table, index, type, inputMode, prop, disabled, step }) => {
    const [inputToggle, switchInput] = useToggle(false);
    const [getValue, keyDown] = useCellValue(index, prop, table, switchInput);
    const cellDisplayValue = cellValueDisplayFormat(type, children);
    const stepValue = step ? step : 0.01;
    return (
        <>
            {!disabled && inputToggle ? (
                <TableCell>
                    <TextField
                        size="small"
                        autoFocus={inputToggle}
                        onBlur={switchInput}
                        onChange={getValue}
                        onKeyDown={keyDown}
                        value={children}
                        variant="filled"
                        type={type}
                        inputMode={inputMode}
                        disabled={disabled}
                        fullWidth={true}
                        inputProps={{ step: stepValue }}
                    />
                </TableCell>
            ) : (
                <TableCell
                    onClick={switchInput}
                    align="center"
                    sx={{
                        marginTop: 1,
                        "&:hover": { cursor: "pointer" },
                        height: 37,
                        justifySelf: "center",
                    }}
                >
                    {prop === "childrenQtty" ? children : cellDisplayValue}
                </TableCell>
            )}
        </>
    );
};

export default Cell;
