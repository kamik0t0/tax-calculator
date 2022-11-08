import { useFontHeaders } from "@customhooks/useFontHeader";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    TableContainer,
} from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import {
    CommonData,
    CommonHeader,
    CommonLLCInsurance,
    CommonUSNExpenses,
    CommonUSNSummary,
} from "../../../exports/components";
import { useCalcReports } from "../../../exports/context";

const ExpensesLLCReport: React.FC = () => {
    const [headersTextColor] = useFontHeaders();
    const sx = Object.assign(
        {
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
        },
        headersTextColor
    );
    const calcData = useTypedSelector((state) => state.calcSlice);
    const { isExpensesLLCDialog, toggleExpensesLLCDialog } = useCalcReports();

    return (
        <Dialog open={isExpensesLLCDialog} fullWidth maxWidth="md">
            <DialogContent>
                <DialogTitle sx={sx}>УСН (доходы - расходы)</DialogTitle>
                <CommonHeader />
                <TableContainer component={Paper}>
                    <CommonData calcData={calcData} />
                    <CommonLLCInsurance calcData={calcData} />
                    <CommonUSNExpenses
                        tax={calcData.taxIncomeExpensesLLC.tax}
                        income={calcData.income}
                        costs={calcData.taxIncomeExpensesLLC.totalCost}
                        minimal={calcData.taxIncomeExpensesLLC.minimal}
                    />
                    <CommonUSNSummary
                        total={calcData.taxIncomeExpensesLLC.total}
                        burden={calcData.burdenIncomeExpensesLLC}
                    />
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleExpensesLLCDialog}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExpensesLLCReport;
