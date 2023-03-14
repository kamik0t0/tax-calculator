import { CustomContext } from "@customhooks/customContext";
import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "@router/AppRouter";
import { getDesignTokens } from "@themes/themes";
import React, { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CustomDrawer, SnackBars } from "./components/index";
import { ISalaryStorage } from "./pages/accrual/exports/interfaces";
import { useSalaryStorage } from "./pages/accrual/hooks/useSalaryStorage";
import { useEmployeeStorage } from "./pages/employees/hooks/useEmployeeStorage";
import { IInvoiceStorage } from "./pages/vat/exports/interfaces";
import { useInvoiceStorage } from "./pages/vat/hooks/useInvoiceStorage";
import { IEmployee } from "./pages/accrual/types/salary";

export const [useColorModeContext, ColorProvider] =
    CustomContext<{
        toggleColorMode: () => void;
    }>();
export const [useSalaryStorageSelector, SalaryStorageProvider] =
    CustomContext<ISalaryStorage>();
export const [useEmployeeStorageSelector, EmployeeStorageProvider] =
    CustomContext<IEmployee[]>();
export const [useInvoiceStorageSelector, InvoiceStorageProvider] =
    CustomContext<IInvoiceStorage>();

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
    // Работа с LocalStorage
    const storageSalaryData = useSalaryStorage();
    const storageEmployeeData = useEmployeeStorage();
    const storageInvoiceData = useInvoiceStorage();

    return (
        <BrowserRouter>
            <ColorProvider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CustomDrawer />
                    <SalaryStorageProvider value={storageSalaryData}>
                        <EmployeeStorageProvider value={storageEmployeeData}>
                            <InvoiceStorageProvider value={storageInvoiceData}>
                                <AppRouter />
                                <SnackBars />
                            </InvoiceStorageProvider>
                        </EmployeeStorageProvider>
                    </SalaryStorageProvider>
                </ThemeProvider>
            </ColorProvider>
        </BrowserRouter>
    );
};

export default App;
