import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Typography } from "@mui/material";
import React from "react";

const RateInfo: React.FC = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <InfoOutlinedIcon
                fontSize="small"
                sx={{ mr: 1, color: "#EA8543" }}
            />
            <Typography variant="body2" color="#EA8543">
                Ставки в регионах могут отличаться
            </Typography>
        </Box>
    );
};

export default RateInfo;
