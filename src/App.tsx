import { CustomContext } from "@customhooks/customContext";
import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTypedSelector } from "@reduxhooks/hooks";
import AppRouter from "@router/AppRouter";
import { getDesignTokens } from "@themes/themes";
import { ISalaryStorage } from "./pages/accrual/exports/interfaces";
import React, { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CustomDrawer, SnackBars, EmployeeDialog } from "./components/index";
import { useSalaryStorage } from "./pages/accrual/hooks/useSalaryStorage";
import { useInvoiceStorage } from "./pages/vat/hooks/useInvoiceStorage";
import { IInvoiceStorage } from "./pages/vat/exports/interfaces";

export const [useColorModeContext, ColorProvider] = CustomContext<{
    toggleColorMode: () => void;
}>();
export const [useSalaryStorageSelector, SalaryStorageProvider] =
    CustomContext<ISalaryStorage>();
export const [useInvoiceStorageSelector, InvoiceStorageProvider] =
    CustomContext<IInvoiceStorage>();

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
    // Работа с LocalStorage
    const storageSalaryData = useSalaryStorage();
    const storageInvoiceData = useInvoiceStorage();

    return (
        <BrowserRouter>
            <ColorProvider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CustomDrawer />
                    <SalaryStorageProvider value={storageSalaryData}>
                        <InvoiceStorageProvider value={storageInvoiceData}>
                            <AppRouter />
                        </InvoiceStorageProvider>
                    </SalaryStorageProvider>
                    <SnackBars />
                    {isDialogEmployee && <EmployeeDialog />}
                </ThemeProvider>
            </ColorProvider>
        </BrowserRouter>
    );
};

export default App;
