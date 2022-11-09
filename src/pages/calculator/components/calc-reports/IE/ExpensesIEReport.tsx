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
    CommonIEInsurance,
    CommonUSNExpenses,
    CommonUSNSummary,
} from "../../../exports/components";
import { useCalcReports } from "../../../exports/context";

const ExpensesIEReport: React.FC = () => {
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
    const { isExpensesIEDialog, toggleExpensesIEDialog } = useCalcReports();

    return (
        <Dialog open={isExpensesIEDialog} fullWidth maxWidth="md">
            <DialogContent>
                <DialogTitle sx={sx}>УСН (доходы - расходы) ИП</DialogTitle>
                <CommonHeader />
                <TableContainer component={Paper}>
                    <CommonData calcData={calcData} />
                    <CommonIEInsurance calcData={calcData} />
                    <CommonUSNExpenses
                        tax={calcData.taxIncomeExpensesIE.tax}
                        income={calcData.income}
                        costs={calcData.taxIncomeExpensesIE.totalCost}
                        minimal={calcData.taxIncomeExpensesIE.minimal}
                    />
                    <CommonUSNSummary
                        total={calcData.taxIncomeExpensesIE.total}
                        burden={calcData.burdenIncomeExpensesIE}
                    />
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleExpensesIEDialog}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExpensesIEReport;
