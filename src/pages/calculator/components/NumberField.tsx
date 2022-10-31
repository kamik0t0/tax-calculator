import { TextField } from "@mui/material";
import React from "react";

const NumberField: React.FC<{
    label: string;
    value: number;
    getNumberValue: (value: number) => void;
}> = ({ label, value, getNumberValue }) => {
    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const inputNumberValue = +event.target.value;
        getNumberValue(inputNumberValue);
    };

    return (
        <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            type="number"
            value={value}
            onChange={onChange}
            sx={{ width: 150 }}
        />
    );
};

export default NumberField;
