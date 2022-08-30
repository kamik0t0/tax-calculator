import { Box, CardContent, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import { toRU } from "../../helpers/currencyFormat";

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
                marginTop: 1,
                marginLeft: 2,
                justifyContent: "flex-end",
            }}
        >
            <Paper elevation={0} sx={{ height: 50, width }}>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
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
