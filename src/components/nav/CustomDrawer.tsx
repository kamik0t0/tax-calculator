import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItemButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LinkRouter from "@router/LinkRouter";
import { drawerWidth } from "./exports/utils";
import * as React from "react";
import { FC } from "react";
import {
    AppBar,
    DrawerHeader,
    Main,
    SnackSwitcher,
    ThemeSwitcher,
} from "./exports/components";
import { appBarLinks, salaryLinks, sideBarLinks } from "./exports/utils";

const CustomDrawer: FC = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <>
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
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ color: "#fff" }}
                            >
                                Калькулятор налогов
                            </Typography>
                        </Toolbar>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mr: 2,
                                }}
                            >
                                <Link
                                    href="https://github.com/kamik0t0/tax-calculator"
                                    color="inherit"
                                    target="_blank"
                                >
                                    <GitHubIcon
                                        fontSize="large"
                                        sx={{
                                            "&:hover": { cursor: "pointer" },
                                        }}
                                    />
                                </Link>
                            </Box>
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
                    <List sx={{ mb: 10 }}>
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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Зарплата</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {salaryLinks.map((link) => (
                                    <React.Fragment key={link.name}>
                                        <LinkRouter path={link.path}>
                                            <ListItemButton
                                                onClick={handleDrawerClose}
                                            >
                                                {link.name}
                                            </ListItemButton>
                                        </LinkRouter>
                                        {/* <Divider /> */}
                                    </React.Fragment>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </List>

                    <Divider />
                    <ThemeSwitcher />
                    <SnackSwitcher />
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                </Main>
            </Box>
        </>
    );
};

export default CustomDrawer;
