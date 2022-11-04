import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import React from "react";
import { useColorModeContext } from "../exports/context";

const ThemeSwitcher: React.FC = () => {
    const theme = useTheme();
    const colorMode = useColorModeContext();
    return (
        <Tooltip title="Тема" placement="right" enterDelay={300}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml: 8,
                    mr: 2,
                    width: 75,
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
        </Tooltip>
    );
};

export default ThemeSwitcher;
