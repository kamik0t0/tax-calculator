import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";

const DatePicker: React.FC<{
    value: string;
    onChange: (date: Dayjs | null) => void;
    error: boolean;
}> = ({ value, onChange, error }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    inputFormat="DD.MM.YYYY"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{ width: 150 }}
                            error={error}
                        />
                    )}
                />
            </LocalizationProvider>
        </>
    );
};

export default DatePicker;
