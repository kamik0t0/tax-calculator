import { Card } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BreadCrumbs } from "@components/index";
import { useSnack } from "@customhooks/useSnack";

export const Layout: React.FC = () => {
    const showSnack = useSnack();
    useEffect(() => {
        let target = document.getElementById("viewport");
        let observer = new ResizeObserver((mutations) => {
            try {
                const viewportWidth = mutations[0].borderBoxSize[0].inlineSize;
                if (viewportWidth < 1280) {
                    showSnack(
                        "warning",
                        "Оптимальная ширина экрана 1280px и более"
                    );
                }
            } catch (error) {
                console.log(error);
            }
        });
        if (target) {
            observer.observe(target);
        }
    }, []);

    return (
        <>
            <Card
                id="viewport"
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
