import {
    Breadcrumbs as MUIBreadcrumbs,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import LinkRouter from "@router/LinkRouter";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";

export const breadcrumbNameMap: { [key: string]: string } = {
    "/home": "главная",
    "/nds": "ндс",
    "/salary": "зарплата",
    "/about": "о сайте",
    "/contacts": "контакты",
    "/accrual": "начисления",
    "/dividends": "дивиденды",
    "/employees": "сотрудники",
    "/calculator": "калькулятор",
};

const Breadcrumbs: FC = () => {
    const { pathname } = useLocation();
    const pathnames = pathname.split("/").filter((x) => x);

    return (
        <MUIBreadcrumbs aria-label="breadcrumb" sx={{ ml: 2 }}>
            {pathnames.length > 0 ? (
                <LinkRouter key={nanoid(3)} path="/">
                    <ListItemButton sx={{ color: "#fff" }}>
                        <Typography>главная</Typography>
                    </ListItemButton>
                </LinkRouter>
            ) : (
                <ListItemText
                    sx={{
                        color: "#fff",
                        paddingX: 2,
                        paddingY: 1,
                        marginY: 0,
                    }}
                >
                    <Typography>главная</Typography>
                </ListItemText>
            )}
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <ListItemButton key={nanoid(3)} sx={{ color: "#fff" }}>
                        <Typography>{breadcrumbNameMap[routeTo]}</Typography>
                    </ListItemButton>
                ) : (
                    <LinkRouter key={nanoid(3)} path={routeTo}>
                        <ListItemButton sx={{ color: "#fff" }}>
                            <Typography>
                                {breadcrumbNameMap[routeTo]}
                            </Typography>
                        </ListItemButton>
                    </LinkRouter>
                );
            })}
        </MUIBreadcrumbs>
    );
};

export default Breadcrumbs;
