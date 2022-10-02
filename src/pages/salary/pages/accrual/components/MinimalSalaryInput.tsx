import { Box, TextField } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { setMinimalSalary } from "@salarystore/salary-reducer";
import React, { ChangeEvent, FC } from "react";

const MinimalSalaryInput: FC = () => {
    const dispatch = useTypedDispatch();
    const { minimalSalary } = useTypedSelector((state) => state.salarySlice);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setMinimalSalary(+event.target.value as number));
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            МРОТ
            <TextField
                size="small"
                type="number"
                value={minimalSalary}
                onChange={handleChange}
                sx={{ ml: 1, width: 100 }}
                inputProps={{ step: 0.01, min: 0 }}
            ></TextField>
        </Box>
    );
};

export default MinimalSalaryInput;
