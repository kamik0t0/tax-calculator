import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";

const EmployeeIsCivil: React.FC<{
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ isChecked, onChange }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography>ГПХ</Typography>
            <Checkbox size="small" checked={isChecked} onChange={onChange} />
        </Box>
    );
};

export default EmployeeIsCivil;
