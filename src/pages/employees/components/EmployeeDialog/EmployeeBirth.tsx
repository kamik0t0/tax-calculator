import { stampToStr } from "@helpers/dateHelpers";
import { Box, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";

const EmployeeBirth: React.FC<{
    value?: number;
    onChange: (date: Dayjs | null) => void;
}> = ({ value, onChange }) => {
    return (
        <Box
            sx={{
                width: 150,
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    inputFormat="DD.MM.YYYY"
                    value={stampToStr(value || 0)}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default EmployeeBirth;
