import { Input, TableCell, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toRU } from "@helpers/currencyFormat";
import { roundNumber } from "@helpers/roundNumber";

const InputCell: FC<{
    children: string | number;
    index: number;
    type: string;
    prop: string;
    isMoney?: boolean;
    step?: number;
    getInputData: (value: string | number, index: number, prop: string) => any;
}> = ({ children, index, type, prop, isMoney, step, getInputData }) => {
    const [input, setInput] = useState<boolean>(false);
    const [prevValue, setPrevValue] = useState<string | number>();

    const handleSwitchInput = () => {
        setPrevValue(children);
        setInput(!input);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = roundNumber(event.target.value, 2);
        getInputData(numValue, index, prop);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            const numValue = roundNumber(ChangeEvent.target.value, 2);
            setInput(false);
            setPrevValue(numValue);
            getInputData(numValue, index, prop);
        }
        // возврат текущего значения
        if (event.code === "Escape") {
            handleSwitchInput();
            getInputData(prevValue || children, index, prop);
        }
    };

    const onFocus = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => event.target.select();

    const formattedChildren = isMoney ? toRU.format(+children) : children;

    useEffect(() => {
        setPrevValue(children);
    }, []);

    return (
        <>
            {input ? (
                <TableCell variant="body" align="center">
                    <Input
                        autoFocus={input}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onBlur={handleSwitchInput}
                        onFocus={onFocus}
                        value={children}
                        type={type}
                        inputProps={{ step: step || 0.01, min: 0 }}
                    />
                </TableCell>
            ) : (
                <TableCell
                    variant="body"
                    onClick={handleSwitchInput}
                    align="center"
                    sx={{
                        "&:hover": { cursor: "pointer" },
                    }}
                >
                    <Typography>{formattedChildren}</Typography>
                </TableCell>
            )}
        </>
    );
};

export default InputCell;
