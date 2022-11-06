import { Box } from "@mui/material";
import * as React from "react";
import { FC } from "react";
import {
    DrawerHeaderStyled,
    Header,
    Main,
    SideMenu,
} from "./exports/components";

const CustomDrawer: FC = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Header open={open} setOpen={setOpen} />
                <SideMenu open={open} setOpen={setOpen} />
                <Main open={open}>
                    <DrawerHeaderStyled />
                </Main>
            </Box>
        </>
    );
};

export default CustomDrawer;
