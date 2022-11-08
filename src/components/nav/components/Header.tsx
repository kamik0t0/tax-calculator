import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { AppBarStyled } from "../exports/components";
import { HeaderLinks } from "../exports/components";

const Header: React.FC<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
    const handleDrawerOpen = () => setOpen(true);
    return (
        <AppBarStyled position="fixed" open={open}>
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
                <HeaderLinks />
            </Box>
        </AppBarStyled>
    );
};

export default Header;
