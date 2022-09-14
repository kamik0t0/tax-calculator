import { Box } from "@mui/material";
import React, { FC } from "react";
import Summary from "@sharedcomponents/Summary";

export const TotalSummary: FC<{ nds: number }> = ({ nds }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                mb: 3,
                mt: 3,
            }}
        >
            <Summary text="НДС к уплате: " width={300} textVariant="h6">
                {nds}
            </Summary>
        </Box>
    );
};

export default TotalSummary;
