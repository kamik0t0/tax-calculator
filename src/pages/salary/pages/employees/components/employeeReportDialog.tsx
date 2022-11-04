import { setIsDialogReportEmployee } from "@dialogstore/dialog-reducer";
import { timestampToNativeToLocaleString } from "@helpers/dateHelpers";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React, { FC, useMemo } from "react";
import { useReport } from "../exports/hooks";
import { Limits } from "../exports/utils";

const getInsuranceRates = (rateCode: string) => {
    switch (rateCode) {
        case "20":
            return { ret: "10%", med: "5%", social: "0%", accident: "0.2%" };
        case "06":
            return { ret: "6%", med: "0.1%", social: "1.5%", accident: "0.2%" };
        default:
            return {
                ret: "22%",
                med: "5.1%",
                social: "2.9%",
                accident: "0.2%",
            };
    }
};

// TODO: придумать как вызывать диалог с разными children
const EmployeeReportDialog: FC = () => {
    const dispatch = useTypedDispatch();
    const { employee, rateCode } = useTypedSelector(
        (state) => state.salarySlice
    );
    const { isDialogReportEmployee } = useTypedSelector(
        (state) => state.dialogSlice
    );
    const handleCencel = () => dispatch(setIsDialogReportEmployee(false));

    const [
        employeeSalaries,
        cumulativeSalary,
        overSocialLimit,
        cumulativeOverSocialLimit,
        overRetirementLimit,
        cumulativeOverRetirementLimit,
        insuranceRetirement,
        insuranceCumulativeRetirement,
        insuranceMedical,
        insuranceCumulativeMedical,
        insuranceSocial,
        insuranceCumulativeSocial,
        insuranceAccident,
        insuranceCumulativeAccident,
        insuranceRetirementBase,
        insuranceRetiremenCumulativetBase,
        insuranceSocialBase,
        insuranceSocialCumulativeBase,
        PIT,
        PITCumulativeArr,
    ] = useReport(employee.id);

    const rates = useMemo(() => getInsuranceRates(rateCode), [rateCode]);

    return (
        <Dialog open={isDialogReportEmployee || false} fullWidth maxWidth="xl">
            <DialogContent>
                {employee.id && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            mt: 1,
                            mb: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                width: 500,
                            }}
                        >
                            <DialogContentText>
                                Отчет по сотруднику:
                                {" " + employee.surname + " " + employee.name}
                            </DialogContentText>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: 500,
                                }}
                            >
                                <Typography>{employee?.position}</Typography>
                                <Typography>
                                    {employee.birth
                                        ? timestampToNativeToLocaleString(
                                              employee.birth
                                          )
                                        : ""}
                                </Typography>
                                <Typography>
                                    {employee.sex
                                        ? employee.sex === "male"
                                            ? "Мужской"
                                            : "Женский"
                                        : ""}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: 850,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Предел ОПС</Typography>
                                <Typography>{Limits.retirement}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Предел ФСС</Typography>
                                <Typography>{Limits.social}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Код тарифа</Typography>
                                <Typography>{rateCode}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Ставка ОПС</Typography>
                                <Typography>{rates.ret}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Ставка ОМС</Typography>
                                <Typography>{rates.med}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Ставка ФСС</Typography>
                                <Typography>{rates.social}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Ставка НС и ПЗ</Typography>
                                <Typography>{rates.accident}</Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                <TableContainer component={Paper}>
                    <Table
                        size="small"
                        stickyHeader
                        // sx={{ minWidth: 650, mt: 1 }}
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">Январь</TableCell>
                                <TableCell align="center">Февраль</TableCell>
                                <TableCell align="center">Март</TableCell>
                                <TableCell align="center">Апрель</TableCell>
                                <TableCell align="center">Май</TableCell>
                                <TableCell align="center">Июнь</TableCell>
                                <TableCell align="center">Июль</TableCell>
                                <TableCell align="center">Август</TableCell>
                                <TableCell align="center">Сентябрь</TableCell>
                                <TableCell align="center">Октябрь</TableCell>
                                <TableCell align="center">Ноябрь</TableCell>
                                <TableCell align="center">Декабрь</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    Начисление
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {employeeSalaries.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {accrualSumm.toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {cumulativeSalary.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {accrualSumm.toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell rowSpan={4} align="center">
                                    Суммы сверх предела
                                </TableCell>

                                <TableCell rowSpan={2} align="center">
                                    на ОПС
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {overRetirementLimit.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {cumulativeOverRetirementLimit.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell rowSpan={2} align="center">
                                    в ФСС
                                </TableCell>

                                <TableCell align="center">Месяц</TableCell>
                                {overSocialLimit.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {accrualSumm.toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {cumulativeOverSocialLimit.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>

                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    База для начисления взносов на ОПС
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {insuranceRetirementBase.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {insuranceRetiremenCumulativetBase.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    База для начисления взносов на ФСС
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {insuranceSocialBase.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {insuranceSocialCumulativeBase.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    Начислено взносов на ОПС
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {insuranceRetirement.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {insuranceCumulativeRetirement.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    Начислено взносов на ОМС
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {insuranceMedical.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {accrualSumm.toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {insuranceCumulativeMedical.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    Начислено взносов на ФСС
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {insuranceSocial.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {accrualSumm.toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {insuranceCumulativeSocial.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    Начислено взносов на НС и ПЗ
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {insuranceAccident.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {accrualSumm.toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {insuranceCumulativeAccident.map(
                                    (accrualSumm, index) => (
                                        <TableCell key={index} align="center">
                                            {accrualSumm.toFixed(2)}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    rowSpan={2}
                                    colSpan={2}
                                    align="center"
                                >
                                    НДФЛ
                                </TableCell>
                                <TableCell align="center">Месяц</TableCell>
                                {PIT.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {Math.round(accrualSumm).toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Год</TableCell>
                                {PITCumulativeArr.map((accrualSumm, index) => (
                                    <TableCell key={index} align="center">
                                        {Math.round(accrualSumm).toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
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
