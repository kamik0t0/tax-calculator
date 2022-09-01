import { TableCell, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { toRU } from "../../helpers/currencyFormat";
import { IInvoice } from "../../interfaces/IInvoice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useTypedDispatch } from "../../redux/hooks/hooks";
import { calculateInvoiceNDS } from "../../scripts/calculateInvoiceNDS";

const Cell: FC<{
    invoices: IInvoice[];
    children: string | number;
    name: string;
    action: ActionCreatorWithPayload<IInvoice[]>;
    index: number;
    prop: string;
    type: string;
    disabled: boolean;
}> = ({ invoices, children, name, action, index, prop, type, disabled }) => {
    const dispatch = useTypedDispatch();
    const [inputToggle, setInputToggle] = useState<boolean>(false);

    const switchInput = () => setInputToggle((prev) => !prev);

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value);

    const setValue = (value: string) => {
        const InvoicesToDispatch = calculateInvoiceNDS(
            invoices,
            index,
            value,
            prop
        );
        dispatch(action(InvoicesToDispatch));
    };

    const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            setInputToggle(false);
            return setValue(ChangeEvent.target.value);
        }
    };
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
                        value={children}
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
                    {type === "number" ? toRU.format(+children) : children}
                </TableCell>
            )}
        </>
    );
};

export default Cell;
