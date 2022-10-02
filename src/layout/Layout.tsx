import { Card } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { BreadCrumbs } from "@components/index";

const Layout: React.FC = () => {
    return (
        <>
            <Card
                sx={{
                    width: "100vw",
                    height: "91vh",
                    overflow: "clip",
                }}
            >
                <BreadCrumbs />
                <Outlet />
            </Card>
        </>
    );
};

export default Layout;
