import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

const FinesUserInputBox = ({ children }: PropsWithChildren<{}>) => {
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
