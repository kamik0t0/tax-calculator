import { styled } from "@mui/material";

const drawerWidth = 240;

export const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    // отступ от navbar
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));
