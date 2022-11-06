import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import React from "react";

const EmployeeSex: React.FC<{
    sex?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ sex, onChange }) => {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={sex || "male"}
                onChange={onChange}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirecton: "row",
                    }}
                >
                    <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Мужчина"
                    />
                    <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Женщина"
                    />
                </Box>
            </RadioGroup>
        </FormControl>
    );
};

export default EmployeeSex;
