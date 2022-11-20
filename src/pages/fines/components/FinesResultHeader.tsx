import { Typography } from "@mui/material";
import React from "react";

const FinesResultHeader: React.FC<{ children: string }> = ({ children }) => {
    return (
        <Typography variant="h6" mb={9}>
            {children}
        </Typography>
    );
};

export default FinesResultHeader;
