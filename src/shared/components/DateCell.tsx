import { defaultDateToLocalRU, makeDefaultDate } from "@helpers/dateHelpers";
import { TableCell, Typography } from "@mui/material";
import DatePicker from "@sharedcomponents/DatePicker";
import { Dayjs } from "dayjs";
import React, { FC, useMemo, useState } from "react";

const DateCell: FC<{
    children: number;
    index: number;
    getDate: (date: number, index: number) => any;
}> = ({ children, index, getDate }) => {
    const [input, setInput] = useState<boolean>(false);
    const [prevValue, setPrevValue] = useState<number>();
    const [error, setError] = useState<boolean>(false);

    const handleSwitchInput = () => {
        setPrevValue(children);
        setInput(!input);
    };

    // возврат текущего значения по Escape
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Escape") {
            handleSwitchInput();
            getDate(prevValue || children, index);
        }
    };

    const onChange = (date: Dayjs | null) => {
        if (date?.format() === "Invalid Date" || date?.format() === undefined) {
            setError(true);
            return;
        }
        const parsedDate = date && Date.parse(date.format());
        if (parsedDate) {
            getDate(parsedDate, index);
            setPrevValue(parsedDate || children);
            setInput(!input);
            setError(false);
        }
    };

    // Форматирование даты
    const formattedDateValue = useMemo(
        () => makeDefaultDate(+children),
        [children]
    );
    const formattedDateChildren = useMemo(
        () => defaultDateToLocalRU(formattedDateValue),
        [formattedDateValue]
    );

    return (
        <>
            {input ? (
                <TableCell variant="body" align="center">
                    <DatePicker
                        value={formattedDateValue}
                        onChange={onChange}
                        error={error}
                        focus={input}
                        onKeyDown={onKeyDown}
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
                    <Typography>{formattedDateChildren}</Typography>
                </TableCell>
            )}
        </>
    );
};

export default DateCell;
