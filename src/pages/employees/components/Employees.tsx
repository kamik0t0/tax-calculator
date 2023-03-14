import { Container, Divider } from "@mui/material";
import React, { FC } from "react";
import {
    EmployeeActionButtons,
    EmployeesList,
    ShowEmployee,
} from "../exports/components";

export const Employees: FC = () => {
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 250,
                    width: "80vw",
                    mt: 2,
                }}
            >
                <EmployeesList />
                <ShowEmployee />
                <Divider
                    orientation="horizontal"
                    variant="fullWidth"
                    flexItem
                    light={true}
                />
                <EmployeeActionButtons />
            </Container>
        </>
    );
};
