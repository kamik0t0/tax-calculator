import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";

const DatePicker: React.FC<{
    value: string;
    error: boolean;
    onChange: (date: Dayjs | null) => void;
    focus?: boolean;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    width?: number;
}> = ({ value, onChange, error, focus, onKeyDown, width }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    inputFormat="DD.MM.YYYY"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        height: 20,
                                        padding: 0.5,
                                        margin: 0.5,
                                        width: width ? width : 150,
                                    },
                                }}
                                autoFocus={focus || false}
                                onKeyDown={onKeyDown}
                                error={error}
                            />
                        );
                    }}
                />
            </LocalizationProvider>
        </>
    );
};

export default DatePicker;
