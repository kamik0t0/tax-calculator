import { CustomContext } from "@customhooks/customContext";
import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTypedSelector } from "@reduxhooks/hooks";
import AppRouter from "@router/AppRouter";
import { getDesignTokens } from "@themes/themes";
import React, { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CustomDrawer, SnackBars } from "./components/index";
import EmployeeDialog from "./pages/salary/pages/accrual/components/Dialog";

export const [useColorModeContext, ColorProvider] = CustomContext<{
    toggleColorMode: () => void;
}>();

const App: React.FC = () => {
    const { isDialogEmployee } = useTypedSelector((state) => state.dialogSlice);
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
                    <SnackBars />
                    {isDialogEmployee && <EmployeeDialog />}
                </ThemeProvider>
            </ColorProvider>
        </BrowserRouter>
    );
};

export default App;
