import { Box } from "@mui/material";
import React from "react";
import PolyButton from "@sharedcomponents/PolyButton";
import { useCalcActions } from "../hooks/useCalcActions";

const CalcActionButtons: React.FC<{ toggleDialog: () => void }> = ({
    toggleDialog,
}) => {
    const [fillWithAvailableData, calcTaxes] = useCalcActions();
    return (
        <>
            <br />
            <br />
            <Box
                sx={{
                    minWidth: "400px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 15,
                }}
            >
                <PolyButton
                    size="large"
                    variant="outlined"
                    onClick={fillWithAvailableData}
                    sx={{
                        width: "150px",
                    }}
                >
                    Заполнить
                </PolyButton>
                <PolyButton
                    size="large"
                    variant="outlined"
                    onClick={toggleDialog}
                    sx={{
                        width: "150px",
                    }}
                >
                    Ставки
                </PolyButton>
            </Box>
            <PolyButton
                size="large"
                variant="contained"
                onClick={calcTaxes}
                sx={{
                    width: "200px",
                    alignSelf: "center",
                }}
            >
                Рассчитать
            </PolyButton>
        </>
    );
};

export default CalcActionButtons;
