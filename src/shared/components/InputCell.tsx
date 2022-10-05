import { Input, TableCell, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toRU } from "@helpers/currencyFormat";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { showSuccessSnackBar } from "@uistore/ui-reducer";

const InputCell: FC<{
    children: string | number;
    width: number;
    index: number;
    type: string;
    prop: string;
    isMoney?: boolean;
    step?: number;
    getInputData: (value: string | number, index: number, prop: string) => any;
}> = ({ children, width, index, type, prop, isMoney, step, getInputData }) => {
    const [input, setInput] = useState<boolean>(false);
    const [prevValue, setPrevValue] = useState<string | number>();

    const handleSwitchInput = () => {
        setPrevValue(children);
        setInput(!input);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        getInputData(event.target.value, index, prop);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            setInput(false);
            setPrevValue(ChangeEvent.target.value);
            getInputData(ChangeEvent.target.value, index, prop);
        }
        // возврат текущего значения
        if (event.code === "Escape") {
            handleSwitchInput();
            getInputData(prevValue || children, index, prop);
        }
    };

    const formattedChildren = isMoney ? toRU.format(+children) : children;

    useEffect(() => {
        setPrevValue(children);
    }, []);

    return (
        <>
            {input ? (
                <TableCell align="center">
                    <Input
                        autoFocus={input}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onBlur={handleSwitchInput}
                        onFocus={(event) => event.target.select()}
                        value={children}
                        type={type}
                        inputProps={{ step: step || 0.01, min: 0 }}
                        sx={{
                            width: width,
                        }}
                    />
                </TableCell>
            ) : (
                <TableCell
                    onClick={handleSwitchInput}
                    align="center"
                    sx={{
                        "&:hover": { cursor: "pointer" },
                        width: width,
                    }}
                >
                    <Typography>{formattedChildren}</Typography>
                </TableCell>
            )}
        </>
    );
};

export default InputCell;
