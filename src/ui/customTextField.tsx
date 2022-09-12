import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";

const theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    paddingY: 40,
                    width: 200,
                },
            },
        },
    },
});

export default function DefaultProps() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <TextField />
            </ThemeProvider>
            <TextField />
        </>
    );
}
