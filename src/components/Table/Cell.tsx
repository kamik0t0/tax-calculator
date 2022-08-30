import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { toRU } from "../../helpers/currencyFormat";
import { IInvoice } from "../../interfaces/IInvoice";

const Cell: FC<{
    children: string | number;
    name: string;
    action: Dispatch<SetStateAction<IInvoice[]>>;
    index: number;
    prop: string;
    type: string;
    disabled: boolean;
}> = ({ children, name, action, index, prop, type, disabled }) => {
    const [inputToggle, setInputToggle] = useState<boolean>(false);

    const switchInput = () => {
        setInputToggle((prev) => !prev);
    };

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    function setValue(value: string) {
        action((prev: IInvoice[]) => {
            if (prop === "summ") {
                prev[index][prop] = +value;
                prev[index].nds = +((+value * 20) / 120).toFixed(2);
            }
            prev[index][prop] = value;

            return [...prev];
        });
    }

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
