import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const Rate: React.FC<{
    value: number;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    inputProps: { step: number; min: number; max: number };
    children: string;
}> = ({ children, value, onChange, inputProps }) => {
    return (
        <Box
            mb={2}
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography>{children}</Typography>
            <TextField
                margin="dense"
                label="Процент"
                value={value}
                type="number"
                variant="outlined"
                size="small"
                onChange={onChange}
                sx={{ width: 100 }}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={inputProps}
            />
        </Box>
    );
};

export default Rate;
