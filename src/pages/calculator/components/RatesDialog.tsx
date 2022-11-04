import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toPercent, toFraction } from "@helpers/toPercent";
import {
    setIncomeRate,
    setExpensesRate,
    setIncomeTaxRate,
} from "@calcstore/calculator-reducer";

// TODO: Декомпозиция

const RatesDialog: React.FC<{
    setIsDialog: React.Dispatch<React.SetStateAction<boolean>>;
    isDialog: boolean;
}> = ({ setIsDialog, isDialog }) => {
    const dispatch = useTypedDispatch();
    const handleClose = () => setIsDialog(false);
    const handleCencel = () => setIsDialog(false);
    const theme = useTheme();
    const headersTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };

    const { incomeRate, expensesRate, LLCIncomeRate } = useTypedSelector(
        (state) => state.calcSlice.rates
    );

    const incomeRatePercent = toPercent(incomeRate);
    const expensesRatePercent = toPercent(expensesRate);
    const LLCIncomeRatePercent = toPercent(LLCIncomeRate);

    const handleIncomePercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const IncomePercent = toFraction(+event.target.value);
        dispatch(setIncomeRate(IncomePercent));
    };
    const handleExpensesPercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const ExpensesPercent = toFraction(+event.target.value);
        dispatch(setExpensesRate(ExpensesPercent));
    };
    const handleIncomeTaxPercent = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const LLCIncomeTaxPercent = toFraction(+event.target.value);
        dispatch(setIncomeTaxRate(LLCIncomeTaxPercent));
    };

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
                    <Box
                        mb={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography>УСН (доходы)</Typography>
                        <TextField
                            margin="dense"
                            label="Процент"
                            value={incomeRatePercent}
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={handleIncomePercent}
                            sx={{ width: 100 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ step: 1, min: 1, max: 6 }}
                        />
                    </Box>
                    <Box
                        mb={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography>УСН (доходы-расходы)</Typography>
                        <TextField
                            margin="dense"
                            label="Процент"
                            value={expensesRatePercent}
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={handleExpensesPercent}
                            sx={{ width: 100 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ step: 1, min: 5, max: 15 }}
                        />
                    </Box>
                    <Box
                        mb={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography>Налог на прибыль (региональный)</Typography>
                        <TextField
                            margin="dense"
                            label="Процент"
                            value={LLCIncomeRatePercent}
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={handleIncomeTaxPercent}
                            sx={{ width: 100 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ step: 0.1, min: 13.5, max: 17 }}
                        />
                    </Box>
                    <br />
                    <Divider sx={{ mb: 1 }} />
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <InfoOutlinedIcon
                            fontSize="small"
                            sx={{ mr: 1, color: "#EA8543" }}
                        />
                        <Typography variant="body2" color="#EA8543">
                            Ставки в регионах могут отличаться
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCencel}>Отмена</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RatesDialog;
