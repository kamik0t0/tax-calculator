import { Box, CardContent, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import { toRU } from "../../../../helpers/currencyFormat";

const Summary: FC<{
    children: number;
    text: string;
    width: number;
    textVariant: any;
}> = ({ children, text, width, textVariant }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                marginLeft: 2,
            }}
        >
            <Paper elevation={0} sx={{ height: 30, width }}>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        padding: 0.2,
                    }}
                >
                    <Typography variant="body1">{text}</Typography>
                    <Typography variant={textVariant}>
                        {toRU.format(children)}
                    </Typography>
                </CardContent>
            </Paper>
        </Box>
    );
};

export default Summary;
