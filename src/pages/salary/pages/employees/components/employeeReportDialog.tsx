import { setIsDialogReportEmployee } from "@dialogstore/dialog-reducer";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React, { FC } from "react";
import { ReportBody, ReportHeader } from "../exports/components";
import { monthsRus } from "../exports/utils";

// TODO: придумать как вызывать диалог с разными children
const EmployeeReportDialog: FC = () => {
    const dispatch = useTypedDispatch();

    const { isDialogReportEmployee } = useTypedSelector(
        (state) => state.dialogSlice
    );
    const handleCencel = () => dispatch(setIsDialogReportEmployee(false));

    return (
        <Dialog open={isDialogReportEmployee || false} fullWidth maxWidth="xl">
            <DialogContent>
                <ReportHeader />
                <TableContainer component={Paper}>
                    <Table size="small" stickyHeader aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                {monthsRus.map((month, index) => (
                                    <TableCell key={index} align="center">
                                        {month}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <ReportBody />
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCencel}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeReportDialog;
