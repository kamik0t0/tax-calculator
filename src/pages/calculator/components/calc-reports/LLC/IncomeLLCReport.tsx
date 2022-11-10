import { toPercentRateSelector } from "@calcstore/selectors/ratesSelector";
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

const IncomeLLCReport: React.FC = () => {
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
    const { isIncomeLLCDialog, toggleIncomeLLCDialog } = useCalcReports();
    const [incomeRatePercent] = useTypedSelector(toPercentRateSelector);
    return (
        <Dialog open={isIncomeLLCDialog} fullWidth maxWidth="md">
            <DialogContent>
                <DialogTitle sx={sx}>УСН (доходы) ООО</DialogTitle>
                <CommonHeader />
                <TableContainer component={Paper}>
                    <CommonData calcData={calcData} />
                    <CommonLLCInsurance calcData={calcData} />
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    2. Налог УСН:
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (2.2) - (2.3)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.taxIncomeLLC.tax)}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    2.1. Доходы, принимаемые к налогообложению
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (Д)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.income)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    2.2. Налога начислено
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (Д) * {incomeRatePercent}%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        (calcData.income * incomeRatePercent) /
                                            100
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    2.3. Вычет страховых взносов
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (1), но не более 50% от (2.2)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.taxIncomeLLC.recoupment
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    3. Итого к уплате (налоги и взносы):
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (1) + (2)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.taxIncomeLLC.total)}
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
                                    (3) / (Д)
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toPercentView.format(
                                        calcData.burdenIncomeLLC
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleIncomeLLCDialog}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default IncomeLLCReport;
