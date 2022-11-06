import { Divider, Drawer, IconButton, useTheme } from "@mui/material";
import React from "react";
import {
    DrawerHeaderStyled,
    SnackSwitcher,
    ThemeSwitcher,
    SideMenuLInks,
} from "../exports/components";
import { drawerWidth } from "../exports/utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SideMenu: React.FC<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
    const theme = useTheme();
    const handleDrawerClose = () => setOpen(false);
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeaderStyled>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </DrawerHeaderStyled>
            <Divider />
            <SideMenuLInks handleDrawerClose={handleDrawerClose} />
            <Divider />
            <ThemeSwitcher />
            <SnackSwitcher />
        </Drawer>
    );
};

export default SideMenu;
