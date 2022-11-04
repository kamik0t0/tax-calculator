import { Card } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const SalaryLayout: React.FC = () => {
    return (
        <>
            <Card sx={{ width: "100vw", height: "90vh" }}>
                <Outlet />
            </Card>
        </>
    );
};

export default SalaryLayout;
