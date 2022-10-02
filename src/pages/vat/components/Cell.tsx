import { formatDisplayedValue } from "@helpers/formatDisplayedValue";
import { makeDefaultDate } from "@helpers/inputDataFormat";
import {
    Box,
    Icon,
    IconButton,
    Input,
    MenuItem,
    Select,
    TableCell,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useCellValue } from "../exports/hooks";

const varRates = [
    { value: "0", name: "0%" },
    { value: "0.1", name: "10%" },
    {
        value: "0.2",
        name: "20%",
    },
    {
        value: "-1",
        name: "mix",
    },
];

const Cell: FC<{
    children: string | number;
    table: string;
    index: number;
    prop: string;
    type: string;
    disabled: boolean;
    width: number;
    vatRate?: number;
}> = ({ children, table, index, prop, type, disabled, width, vatRate }) => {
    const [inputToggle, switchInput] = useState<boolean>(false);
    const [select, setSelect] = useState<boolean>(false);

    const handleSwitchInput = () => {
        setSelect(!select);
        switchInput(!inputToggle);
    };

    const [getInputValue, getSelectValue, keyDown, rate] = useCellValue(
        index,
        prop,
        table,
        vatRate,
        handleSwitchInput
    );

    const formattedInputValue = (prop: string, children: string | number) => {
        if (prop === "date") return makeDefaultDate(+children);
        if (prop === "nds") return children;
        else return children;
    };

    const formatted = formattedInputValue(prop, children);
    const cellDisplayValue = formatDisplayedValue(type, formatted);

    return (
        <>
            {!disabled && inputToggle ? (
                <TableCell
                    align="center"
                    sx={{
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
                                value={rate}
                                onChange={getSelectValue}
                                sx={{
                                    height: 31,
                                    width: width - 32,
                                    mr: 0.5,
                                }}
                            >
                                {varRates &&
                                    varRates.map((rate) => (
                                        <MenuItem
                                            key={rate.value}
                                            value={rate.value.toString()}
                                        >
                                            {rate.name}
                                        </MenuItem>
                                    ))}
                            </Select>
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
                            onChange={getInputValue}
                            onKeyDown={keyDown}
                            value={formatted}
                            type={type}
                            disabled={disabled}
                            inputProps={{ step: 0.01 }}
                            sx={{
                                width: width,
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

                        width: width,
                    }}
                >
                    {cellDisplayValue}
                </TableCell>
            )}
        </>
    );
};

export default Cell;
