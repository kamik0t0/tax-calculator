import { useFontHeaders } from "@customhooks/useFontHeader";
import { toPercentView, toRU } from "@helpers/currencyFormat";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import {
    CommonData,
    CommonHeader,
    CommonLLCInsurance,
} from "../../../exports/components";
import { useCalcReports } from "../../../exports/context";

const BasicLLCReport: React.FC = () => {
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
    const { isBasicLLCDialog, toggleBasicLLCDialog } = useCalcReports();

    return (
        <Dialog open={isBasicLLCDialog} fullWidth maxWidth="md">
            <DialogContent>
                <DialogTitle sx={sx}>
                    Общий режим налогообложения (ОСНО)
                </DialogTitle>
                <CommonHeader />
                <TableContainer component={Paper}>
                    <CommonData calcData={calcData} />
                    <CommonLLCInsurance calcData={calcData} />
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    2. НДС:
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (2.1) - (2.2)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.taxBasicLLC.VAT.vat)}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    2.1. Начисленный
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (Д) * 20 / 120
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.taxBasicLLC.VAT.accrualVAT
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    2.2. К вычету
                                </TableCell>
                                <TableCell width={300} align="center">
                                    [(Р) - (ФОТ)] * 20 / 120
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.taxBasicLLC.VAT.recoupmentVAT
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    3. Налог на прибыль:
                                </TableCell>
                                <TableCell width={300} align="center">
                                    [(3.1) - (3.2)] * 20%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.taxBasicLLC.incomeTax.incomeTax
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    3.1. Налогооблагаемый доход
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (Д) - (2.1)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.taxBasicLLC.incomeTax
                                            .taxableIncome
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    3.2. Налогооблагаемый расход
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (Р) - (2.2) + (1)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.taxBasicLLC.incomeTax
                                            .recoupment
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    4. Итого к уплате (налоги и взносы):
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (1) + (2) + (3)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.taxBasicLLC.total)}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    Налоговая нагрузка, %:
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (4) / (Д) * 100%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toPercentView.format(
                                        calcData.burdenBasicLLC
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleBasicLLCDialog}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BasicLLCReport;
