import {
    calculateTaxes,
    fillWithAvailableData,
} from "@calcstore/calculator-reducer";
import { Box } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { totalSalarySelector } from "../exports/selectors";
import PolyButton from "@sharedcomponents/PolyButton";
import { showSuccessSnackBar } from "@uistore/ui-reducer";

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
    const getAvailableData = () => {
        const data = dispatch(
            fillWithAvailableData(
                VATIncomeSumm,
                VATExpensesSumm + SalarySumm,
                SalarySumm
            )
        );
        // dispatch(showSuccessSnackBar({
        //     open: true,
        //     severity: "success",
        //     message: `НДС не может превышать 20% от суммы документа (${toRU.format(
        //         maxVAT
        //     )}})`,
        // }))
    };
    const dispatch = useTypedDispatch();
    const calcTaxes = () => dispatch(calculateTaxes());
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
                    onClick={getAvailableData}
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
