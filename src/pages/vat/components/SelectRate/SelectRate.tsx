import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

const varRates = [
    { value: "0", name: "0%" },
    { value: "0.1", name: "10%" },
    {
        value: "0.2",
        name: "20%",
    },
    {
        value: "-1",
        name: "mix",
    },
];

const SelectRate: React.FC<{
    value: string;
    width: number;
    onChange: (event: SelectChangeEvent<string>) => void;
}> = ({ value, width, onChange }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            sx={{
                height: 31,
                width: width - 35,
                mr: 0.5,
            }}
        >
            {varRates &&
                varRates.map((rate) => (
                    <MenuItem key={rate.value} value={rate.value.toString()}>
                        {rate.name}
                    </MenuItem>
                ))}
        </Select>
    );
};

export default SelectRate;
