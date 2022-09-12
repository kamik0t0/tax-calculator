import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "antd";
import * as React from "react";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";
import { setTaxStateRate } from "../../../redux/reducers/salary/salary-reducer";

const SelectTaxRate = () => {
    const dispatch = useTypedDispatch();
    const { rateCode } = useTypedSelector((state) => state.salarySlice);

    const handleChange = (event: SelectChangeEvent) =>
        dispatch(setTaxStateRate(event.target.value));

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography>Код тарифа</Typography>
            <Select
                size="small"
                value={rateCode}
                onChange={handleChange}
                sx={{ ml: 1, width: 189 }}
            >
                <MenuItem value="01">01 - Базовый</MenuItem>
                <MenuItem value="06">06 - IT компании</MenuItem>
                <MenuItem value="20">20 - Малый бизнес</MenuItem>
            </Select>
        </Box>
    );
};

export default SelectTaxRate;
