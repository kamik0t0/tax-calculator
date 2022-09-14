import { useToggle } from "@customhooks/useToggle";
import { cellValueDisplayFormat } from "@helpers/cellValueDisplayFormat";
import { InputDataFormat } from "@helpers/inputDataFormat";
import { TableCell, TextField } from "@mui/material";
import React, { FC } from "react";
import { useCellValue } from "../exports/hooks";
import { IInvoice } from "../exports/interfaces";

const Cell: FC<{
    invoices: IInvoice[];
    children: string | number;
    name: string;
    table: string;
    index: number;
    prop: string;
    type: string;
    disabled: boolean;
}> = ({ invoices, children, name, table, index, prop, type, disabled }) => {
    const [inputToggle, switchInput] = useToggle(false);

    const [getValue, keyDown] = useCellValue(
        invoices,
        index,
        prop,
        table,
        switchInput
    );

    const formattedInputValue = InputDataFormat(type, children);
    const cellDisplayValue = cellValueDisplayFormat(type, children);

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
                        label={name}
                        value={formattedInputValue}
                        variant="filled"
                        type={type}
                        disabled={disabled}
                        fullWidth={true}
                        inputProps={{ step: 0.01 }}
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
                    {cellDisplayValue}
                </TableCell>
            )}
        </>
    );
};

export default Cell;
