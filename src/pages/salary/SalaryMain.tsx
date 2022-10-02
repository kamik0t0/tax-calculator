import { Box, ListItemButton } from "@mui/material";
import React from "react";
import LinkRouter from "@router/LinkRouter";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import DividendImage from "./assets/dividend.jpg";
import SalaryImage from "./assets/salary.jpg";
import EmployeesImage from "./assets/employees.jpg";
import { nanoid } from "@reduxjs/toolkit";

const cards = [
    { image: SalaryImage, path: "accrual", alt: "accrual", name: "Начисления" },
    {
        image: DividendImage,
        path: "dividends",
        alt: "dividends",
        name: "Дивиденды",
    },
    {
        image: EmployeesImage,
        path: "employees",
        alt: "employees",
        name: "Сотрудники",
    },
];

const SalaryMain: React.FC = () => {
    return (
        <Box sx={{ display: "flex" }}>
            {cards.map((card) => (
                <LinkRouter key={nanoid(3)} path={card.path}>
                    <ListItemButton sx={{ color: "#fff" }}>
                        <Card sx={{ maxWidth: 160 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={card.image}
                                    alt={card.alt}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {card.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </ListItemButton>
                </LinkRouter>
            ))}
        </Box>
    );
};

export default SalaryMain;
