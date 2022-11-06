import {
    calculateTaxes,
    fillWithAvailableData,
} from "@calcstore/calculator-reducer";
import { Box, Button } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { totalSalarySelector } from "../exports/selectors";

const CalcActionButtons: React.FC<{ toggleDialog: () => void }> = ({
    toggleDialog,
}) => {
    const VATIncomeSumm = useTypedSelector(
        (state) => state.invoiceSlice.summary.sales.summ
    );
    const VATExpensesSumm = useTypedSelector(
        (state) => state.invoiceSlice.summary.purches.summ
    );
    const SalarySumm = useTypedSelector(totalSalarySelector);
    const getAvailableData = () =>
        dispatch(
            fillWithAvailableData(
                VATIncomeSumm,
                VATExpensesSumm + SalarySumm,
                SalarySumm
            )
        );
    const dispatch = useTypedDispatch();
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
                <Button
                    size="large"
                    variant="outlined"
                    onClick={getAvailableData}
                    sx={{
                        width: "150px",
                    }}
                >
                    Заполнить
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    onClick={toggleDialog}
                    sx={{
                        width: "150px",
                    }}
                >
                    Ставки
                </Button>
            </Box>
            <Button
                size="large"
                variant="contained"
                onClick={() => dispatch(calculateTaxes())}
                sx={{
                    width: "200px",
                    alignSelf: "center",
                }}
            >
                Рассчитать
            </Button>
        </>
    );
};

export default CalcActionButtons;
