import { useFontHeaders } from "@customhooks/useFontHeader";
import { useToggle } from "@customhooks/useToggle";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import {
    CalcDataOutput,
    Info,
    RatesDialog,
    UserInputData,
} from "./exports/components";

export const Calculator: React.FC = () => {
    const [isDialog, toggleDialog] = useToggle(false);
    const [headersTextColor] = useFontHeaders();

    return (
        <>
            <br />
            <Container
                maxWidth="lg"
                sx={{
                    overflowY: "auto",
                    height: "84vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                }}
            >
                <Box sx={{ alignSelf: "center" }}>
                    <Typography variant="h5" sx={headersTextColor}>
                        Калькулятор налогов
                    </Typography>
                </Box>
                <Container
                    sx={{
                        overflowY: "auto",

                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <UserInputData toggleDialog={toggleDialog} />
                    <Divider orientation="vertical" light={true} />
                    <CalcDataOutput />
                </Container>
                <Info>
                    Калькулятор налогов в первую очередь предназначен для
                    сравнения налоговой нагрузки при применении разных режимов
                    налогообложения исходя из одинаковых входных данных.
                    Экономические субъекты могут заниматься деятельностью
                    которая предполагает уплату дополнительных налогов таких как
                    акцизы, налог на добычу полезных ископаемых и многое другое
                    из того что калькулятор не учитывает. Поэтому не стоит
                    полагаться на расчеты выдаваемые калькулятором как точно
                    соответствующие тем условиям в которых хозяйствующий субъект
                    осуществляете свою деятельность.
                </Info>
            </Container>
            <RatesDialog isDialog={isDialog} toggleDialog={toggleDialog} />
        </>
    );
};
