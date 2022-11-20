import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const FinesUserInputBox: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box
            sx={{
                minWidth: "400px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
            }}
        >
            {children}
        </Box>
    );
};

export default FinesUserInputBox;
