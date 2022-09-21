import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDesignTokens } from "@themes/themes";
import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import CustomDrawer from "./components/nav/CustomDrawer";
import AppRouter from "./routers/AppRouter";
import { CustomContext } from "@customhooks/customContext";

export const [useColorModeContext, ColorProvider] = CustomContext<{
    toggleColorMode: () => void;
}>();

const App: React.FC = () => {
    const [mode, setMode] = useState<PaletteMode>("dark");
    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () =>
                setMode((prevMode: PaletteMode) =>
                    prevMode === "light" ? "dark" : "light"
                ),
        }),
        []
    );
    // Update the theme only if the mode changes
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <BrowserRouter>
            <ColorProvider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CustomDrawer />
                    <AppRouter />
                </ThemeProvider>
            </ColorProvider>
        </BrowserRouter>
    );
};

export default App;
