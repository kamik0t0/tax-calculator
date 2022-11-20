import { TextField } from "@mui/material";
import React from "react";

const EmployeeDialogName: React.FC<{
    value?: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
}> = ({ value, label, onChange, required }) => {
    return (
        <TextField
            required={required}
            value={value}
            onChange={onChange}
            label={label}
            autoFocus
            margin="dense"
            type="text"
            variant="standard"
            size="small"
            sx={{ width: 170 }}
        />
    );
};

export default EmployeeDialogName;
