import { useTheme } from "@mui/material";

export const useFontHeaders = () => {
    const theme = useTheme();
    const headersTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };
    const valueTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };
    return [headersTextColor, valueTextColor];
};
