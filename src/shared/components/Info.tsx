import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Info: React.FC<{ children: string }> = ({ children }) => {
    return (
        <>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <InfoOutlinedIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "#EA8543" }}
                />
                <Typography variant="body2" color="#EA8543">
                    {children}
                </Typography>
            </Box>
        </>
    );
};

export default Info;
