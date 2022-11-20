import { Box, TextField } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { setSalaryDistrictCoeff } from "@salarystore/salary-reducer";
import React, { ChangeEvent, FC } from "react";

const DistrictCoefficientInput: FC = () => {
    const dispatch = useTypedDispatch();
    const { districtCoeff } = useTypedSelector((state) => state.salarySlice);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setSalaryDistrictCoeff(+event.target.value as number));
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            Районный коэффициент
            <TextField
                size="small"
                type="number"
                value={districtCoeff}
                onChange={handleChange}
                sx={{ ml: 1, width: 100 }}
                inputProps={{ step: 0.01, min: 1 }}
            />
        </Box>
    );
};

export default DistrictCoefficientInput;
