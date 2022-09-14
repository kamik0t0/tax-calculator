import { TableCell, Input } from "@mui/material";
import React, { FC } from "react";
import { useToggle } from "@customhooks/useToggle";
import { cellValueDisplayFormat } from "@helpers/cellValueDisplayFormat";
import { useCellValue } from "../exports/hooks";
import { ISalary } from "../exports/interfaces";

const Cell: FC<{
    salary: ISalary[];
    children: string | number;
    table: string;
    index: number;
    prop: string;
    type?: string;
    inputMode?: "text" | "numeric" | "decimal" | undefined;
    step?: number;
    width: number;
    disabled: boolean;
}> = ({
    children,
    table,
    index,
    type,
    inputMode,
    prop,
    disabled,
    step,
    width,
}) => {
    const [inputToggle, switchInput] = useToggle(false);
    const [getValue, keyDown] = useCellValue(index, prop, table, switchInput);
    const cellDisplayValue = cellValueDisplayFormat(type, children);
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
                    <Input
                        autoFocus={inputToggle}
                        onBlur={switchInput}
                        onChange={getValue}
                        onKeyDown={keyDown}
                        value={children}
                        type={type}
                        inputMode={inputMode}
                        disabled={disabled}
                        inputProps={{ step: stepValue }}
                        sx={{
                            width: width,
                            height: 29,
                            backgroundColor: "#F0F0F0",
                        }}
                    />
                </TableCell>
            ) : (
                <TableCell
                    onClick={switchInput}
                    align="center"
                    sx={{
                        "&:hover": { cursor: "pointer" },
                        height: 31,
                        width: width,
                    }}
                >
                    {prop === "childrenQtty" ? children : cellDisplayValue}
                </TableCell>
            )}
        </>
    );
};

export default Cell;
