import { Container } from "@mui/material";
import React from "react";
import { FinesContent, Info, FinesHeader } from "../exports/components";

const Fines: React.FC = (props) => {
    return (
        <>
            <Container
                maxWidth="md"
                sx={{
                    overflowY: "auto",
                    height: "85vh",
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "space-between",
                }}
            >
                <FinesHeader />
                <FinesContent />
                <Info>
                    Калькулятор осуществляет расчет пеней начисленных после
                    28.02.2011г. включительно. Учитывает изменения правил
                    расчета в т.ч. переходные периоды. Последняя учтенная ставка
                    рефинансирования от 19.09.2022г. и равна 7,5%.
                </Info>
            </Container>
        </>
    );
};

export default Fines;
