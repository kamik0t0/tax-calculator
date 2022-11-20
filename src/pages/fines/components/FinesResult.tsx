import { Stack } from "@mui/material";
import React from "react";
import { FinesResultContent, FinesResultHeader } from "../exports/components";

const FinesResult: React.FC = () => {
    return (
        <Stack
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
            }}
        >
            <FinesResultHeader>Сумма пеней</FinesResultHeader>
            <FinesResultContent />
        </Stack>
    );
};

export default FinesResult;
