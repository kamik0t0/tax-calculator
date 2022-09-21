import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import React from "react";
import { useColorModeContext } from "../../App";

const ThemeSwitcher: React.FC = () => {
    const theme = useTheme();
    const colorMode = useColorModeContext();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: 6,
                mr: 2,
            }}
        >
            {theme.palette.mode === "light" ? (
                <WbSunnyIcon />
            ) : (
                <DarkModeIcon />
            )}
            <Switch
                color="default"
                sx={{
                    ml: 1,
                }}
                onClick={colorMode.toggleColorMode}
            />
        </Box>
    );
};

export default ThemeSwitcher;
