import { TextField } from "@mui/material";
import React from "react";
import { roundNumber } from "@helpers/roundNumber";

const NumberField: React.FC<{
    label: string;
    value: number;
    getNumberValue: (value: number) => void;
}> = ({ label, value, getNumberValue }) => {
    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const numValue = roundNumber(event.target.value, 2);
        getNumberValue(+numValue);
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
