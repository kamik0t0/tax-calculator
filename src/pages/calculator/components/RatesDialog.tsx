import { toPercentRateSelector } from "../exports/selectors";
import { useFontHeaders } from "@customhooks/useFontHeader";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
} from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { Rate, RateInfo } from "../exports/components";
import { useRates } from "../exports/hooks";

const RatesDialog: React.FC<{
    toggleDialog: () => void;
    isDialog: boolean;
}> = ({ toggleDialog, isDialog }) => {
    const [headersTextColor] = useFontHeaders();
    const {
        handleIncomePercent,
        handleExpensesPercent,
        handleIncomeTaxPercent,
    } = useRates();

    const [incomeRatePercent, expensesRatePercent, LLCIncomeRatePercent] =
        useTypedSelector(toPercentRateSelector);

    return (
        <Dialog open={isDialog} fullWidth>
            <DialogContent>
                <DialogContentText sx={headersTextColor}>
                    Региональные ставки
                </DialogContentText>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Rate
                        value={incomeRatePercent}
                        onChange={handleIncomePercent}
                        inputProps={{ step: 1, min: 1, max: 6 }}
                    >
                        УСН (доходы)
                    </Rate>
                    <Rate
                        value={expensesRatePercent}
                        onChange={handleExpensesPercent}
                        inputProps={{ step: 1, min: 5, max: 15 }}
                    >
                        УСН (доходы-расходы)
                    </Rate>
                    <Rate
                        value={LLCIncomeRatePercent}
                        onChange={handleIncomeTaxPercent}
                        inputProps={{ step: 0.1, min: 13.5, max: 17 }}
                    >
                        Налог на прибыль (региональный)
                    </Rate>

                    <br />
                    <Divider sx={{ mb: 1 }} />
                    <RateInfo />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDialog}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RatesDialog;
