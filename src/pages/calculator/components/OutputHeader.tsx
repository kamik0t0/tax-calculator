import { useFontHeaders } from "@customhooks/useFontHeader";
import { Stack, Typography } from "@mui/material";
import React from "react";

const OutputHeader: React.FC<{ children: string }> = ({ children }) => {
    return (
        <Stack direction="column">
            <Typography variant="h6">{children}</Typography>
        </Stack>
    );
};

const OutputHeaderWrapper: React.FC<{ headers: string[] }> = ({ headers }) => {
    return (
        <Stack
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            {headers.map((header) => (
                <OutputHeader>{header}</OutputHeader>
            ))}
        </Stack>
    );
};

export default OutputHeaderWrapper;
