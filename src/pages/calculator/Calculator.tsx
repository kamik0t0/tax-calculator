import { useToggle } from "@customhooks/useToggle";
import { Container, Divider } from "@mui/material";
import React from "react";
import {
    CalcDataOutput,
    RatesDialog,
    UserInputData,
} from "./exports/components";

const Calculator: React.FC = () => {
    const [isDialog, toggleDialog] = useToggle(false);
    return (
        <>
            <br />
            <Container
                maxWidth="xl"
                sx={{
                    overflowY: "auto",
                    height: "85vh",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <UserInputData toggleDialog={toggleDialog} />
                <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                    light={true}
                />
                <CalcDataOutput />
            </Container>
            <RatesDialog isDialog={isDialog} toggleDialog={toggleDialog} />
        </>
    );
};

export default Calculator;
