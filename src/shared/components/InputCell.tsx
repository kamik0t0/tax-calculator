import { useDebounce } from "@customhooks/useDebounce";
import { toRU } from "@helpers/currencyFormat";
import { Input, TableCell, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

const InputCell: FC<{
    children: string | number;
    index: number;
    type: string;
    prop: string;
    isMoney?: boolean;
    step?: number;
    ml?: number;
    mr?: number;
    getInputData: (value: string | number, index: number, prop: string) => any;
}> = ({
    children,
    index,
    type,
    prop,
    isMoney,
    step,
    getInputData,
    ml = 0,
    mr = 0,
}) => {
    const [input, setInput] = useState<boolean>(false);
    const [prevValue, setPrevValue] = useState<string | number>();
    const [value, setValue] = useState<string | number>();
    const debounceCallback = useDebounce(getInputData);

    const handleSwitchInput = () => {
        setPrevValue(children);
        setInput(!input);
        setValue(children);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userValue = event.target.value;
        setValue(userValue);
        debounceCallback(value!, index, prop);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            const value = ChangeEvent.target.value;
            setInput(false);
            setPrevValue(value);
            getInputData(value, index, prop);
        }
        if (event.code === "Escape") {
            handleSwitchInput();
            getInputData(prevValue || 1, index, prop);
        }
    };

    const onFocus = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => event.target.select();

    const formattedChildren = isMoney ? toRU.format(+children) : children;

    useEffect(() => {
        getInputData(prevValue || children, index, prop);
    }, [children]);

    return (
        <>
            {input ? (
                <TableCell
                    variant="body"
                    align="center"
                    sx={{ ml: ml, mr: mr }}
                >
                    <Input
                        autoFocus={input}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onBlur={handleSwitchInput}
                        onFocus={onFocus}
                        value={value}
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
                        "&:hover": { cursor: "pointer", ml: ml, mr: mr },
                    }}
                >
                    <Typography>{formattedChildren}</Typography>
                </TableCell>
            )}
        </>
    );
};

export default InputCell;
