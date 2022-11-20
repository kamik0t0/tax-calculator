import { useFontHeaders } from "@customhooks/useFontHeader";
import { Box, Typography } from "@mui/material";
import React from "react";

const FinesHeader: React.FC = (props) => {
    const [headersTextColor] = useFontHeaders();
    return (
        <Box sx={{ alignSelf: "center", mb: 4 }}>
            <Typography variant="h5" sx={headersTextColor}>
                Калькулятор пеней
            </Typography>
        </Box>
    );
};

export default FinesHeader;
