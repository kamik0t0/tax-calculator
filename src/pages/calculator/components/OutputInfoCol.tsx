import { Stack, Typography } from "@mui/material";
import React from "react";

const OutputInfoCol: React.FC = () => {
    return (
        <Stack
            spacing={4}
            sx={{
                display: "flex",
                alignContent: "space-between",
                flexDirection: "column",
            }}
        >
            <Typography>УСН (доходы)</Typography>
            <Typography>УСН (доходы-расходы)</Typography>
            <Typography>Общий</Typography>
        </Stack>
    );
};

export default OutputInfoCol;
