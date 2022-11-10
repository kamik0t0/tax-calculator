import { calcBasicTaxInsuranceSelector } from "@calcstore/selectors/insuranceTotalSelector";
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
import { CommonData, CommonHeader } from "../../../exports/components";
import { useCalcReports } from "../../../exports/context";

const BasicIEReport: React.FC = () => {
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
    const TotalInsurance = useTypedSelector(calcBasicTaxInsuranceSelector);
    const { isBasicIEDialog, toggleBasicIEDialog } = useCalcReports();

    return (
        <Dialog open={isBasicIEDialog} fullWidth maxWidth="md">
            <DialogContent>
                <DialogTitle sx={sx}>
                    Общий режим налогообложения (ОСНО) ИП
                </DialogTitle>
                <CommonHeader />
                <TableContainer component={Paper}>
                    <CommonData calcData={calcData} />
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1. Страховые взносы:
                                </TableCell>
                                <TableCell width={300}></TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(TotalInsurance)}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1.1. В ФСС за работников
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (ФОТ) * 2.9%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.insurance.social)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1.2. В ФОМС за работников
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (ФОТ) * 5.1%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.insurance.medical)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1.3. В ФОМС за себя
                                </TableCell>
                                <TableCell
                                    width={300}
                                    align="center"
                                ></TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.insuranceIE.fixMedical
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1.4. От несчастных случаев за работников
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (ФОТ) * 0.2%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.insurance.accident)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1.5. В ПФР за работников
                                </TableCell>
                                <TableCell width={300} align="center">
                                    (ФОТ) * 22%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.insurance.retirement)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1.6. В ПФР за себя (фиксированные)
                                </TableCell>
                                <TableCell
                                    width={300}
                                    align="center"
                                ></TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.insuranceIE.fixRetirement
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    1.7. В ПФР за себя(с доходов)
                                </TableCell>
                                <TableCell width={300} align="center">
                                    [(Д) - (Р) - [(1) - (1.7)] - 300 000] * 1%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(
                                        calcData.insuranceIE
                                            .floatInsuranceBasicTax
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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
                                    {toRU.format(calcData.taxBasicIE.NDS.tax)}
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
                                        calcData.taxBasicIE.NDS.accrualNDS
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
                                        calcData.taxBasicIE.NDS.recoupmentNDS
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width={600} align="left">
                                    3. НДФЛ:
                                </TableCell>
                                <TableCell width={300} align="center">
                                    [(3.1) - (3.2)] * 13%
                                </TableCell>
                                <TableCell width={250} align="right">
                                    {toRU.format(calcData.taxBasicIE.NDFL.tax)}
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
                                        calcData.taxBasicIE.NDFL.taxableIncome
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
                                        calcData.taxBasicIE.NDFL.recoupment
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
                                    {toRU.format(calcData.taxBasicIE.total)}
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
                                        calcData.burdenBasicIE
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleBasicIEDialog}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BasicIEReport;
