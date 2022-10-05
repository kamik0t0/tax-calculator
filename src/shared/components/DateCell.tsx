import { defaultDateToLocalRU } from "@helpers/dateHelpers";
import { makeDefaultDate } from "@helpers/dateHelpers";
import { Input, TableCell, Typography } from "@mui/material";
import React, { FC, useMemo, useState } from "react";

const DateCell: FC<{
    children: number;
    width: number;
    index: number;
    getDate: (date: string, index: number) => any;
}> = ({ children, width, index, getDate }) => {
    const [input, setInput] = useState<boolean>(false);

    const handleSwitchInput = () => {
        setInput(!input);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        getDate(event.target.value, index);

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
                <TableCell align="center">
                    <Input
                        autoFocus={input}
                        onChange={onChange}
                        onBlur={handleSwitchInput}
                        value={formattedDateValue}
                        type="date"
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
                    <Typography>{formattedDateChildren}</Typography>
                </TableCell>
            )}
        </>
    );
};

export default DateCell;
