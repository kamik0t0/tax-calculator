import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import LinkRouter from "../../routers/LinkRouter";
import { drawerWidth } from "../../utils/drawerWidth";
import { sideBarLinks } from "../../utils/Links";
import { AppBar } from "./AppBar";
import DrawerHeader from "./DrawerHeader";
import { Main } from "./Main";
import { appBarLinks } from "../../utils/Links";

export default function CustomDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Калькулятор налогов
                        </Typography>
                    </Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        {appBarLinks.map((link) => (
                            <LinkRouter key={link.name} path={link.path}>
                                <ListItemButton sx={{ color: "#fff" }}>
                                    {link.name}
                                </ListItemButton>
                            </LinkRouter>
                        ))}
                    </Box>
                </Box>
            </AppBar>
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
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideBarLinks.map((link) => (
                        <React.Fragment key={link.name}>
                            <LinkRouter path={link.path}>
                                <ListItemButton onClick={handleDrawerClose}>
                                    {link.name}
                                </ListItemButton>
                            </LinkRouter>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}
