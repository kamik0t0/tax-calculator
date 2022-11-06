import { Box, Typography } from "@mui/material";
import React from "react";
import { NumberField } from "../exports/components";

const UserInputField: React.FC<{
    children: string;
    value: number;
    getNumberValue: (value: number) => void;
}> = ({ children, value, getNumberValue }) => {
    return (
        <Box
            sx={{
                minWidth: "400px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography>{children}:</Typography>
            <NumberField
                label={children}
                value={value}
                getNumberValue={getNumberValue}
            />
        </Box>
    );
};

export default UserInputField;
