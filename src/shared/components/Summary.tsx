import { Box, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import { toRU } from "@helpers/currencyFormat";

const Summary: FC<{
    children: number;
    text: string;
    width: number;
    textVariant: any;
    direction?: string;
}> = React.memo(({ children, text, width, textVariant, direction }) => {
    const flexDirection = direction ? direction : "row";
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                marginLeft: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width,
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: { flexDirection },
                    alignItems: "center",
                    padding: 0.1,
                }}
            >
                <Typography variant="body1">{text}</Typography>
                <Typography variant={textVariant}>
                    {toRU.format(children)}
                </Typography>
            </Paper>
        </Box>
    );
});

export default Summary;
