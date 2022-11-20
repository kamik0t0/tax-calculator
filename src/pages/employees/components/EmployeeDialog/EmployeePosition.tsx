import { Box, TextField } from "@mui/material";
import React from "react";

const EmployeePosition: React.FC<{
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
    return (
        <Box
            mb={2}
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
            }}
        >
            <TextField
                autoFocus
                margin="dense"
                label="Должность"
                value={value}
                type="text"
                variant="standard"
                size="small"
                onChange={onChange}
                fullWidth
            />
        </Box>
    );
};

export default EmployeePosition;
