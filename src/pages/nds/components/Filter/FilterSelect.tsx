import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC, MouseEventHandler } from "react";

type items = { value: string; name: string };

const FilterSelect: FC<{
    onClick: MouseEventHandler<HTMLDivElement>;
    onChange: (event: SelectChangeEvent<string>) => void;
    value: string;
    items: items[];
}> = ({ onClick, value, onChange, items }) => {
    return (
        <Select
            size="small"
            onClick={onClick}
            value={value}
            onChange={onChange}
            sx={{ width: 150, ml: 2 }}
        >
            {items.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                    {item.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default FilterSelect;
