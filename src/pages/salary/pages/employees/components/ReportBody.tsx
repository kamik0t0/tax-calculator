import { TableBody, TableCell, TableRow } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { ReportDataRow } from "../exports/components";
import { employeeSalaryDataSelector } from "../exports/selectors";

const ReportBody: React.FC = () => {
    const [
        employeeSalaries,
        cumSalary,
        overSocialLimit,
        cumOverSocialLimit,
        overRetirementLimit,
        cumOverRetirementLimit,
        insuranceRetirement,
        insurancecumRetirement,
        insuranceMedical,
        insurancecumMedical,
        insuranceSocial,
        insurancecumSocial,
        insuranceAccident,
        insurancecumAccident,
        insuranceRetirementBase,
        insuranceRetiremencumtBase,
        insuranceSocialBase,
        insuranceSocialcumBase,
        PIT,
        PITcumArr,
    ] = useTypedSelector(employeeSalaryDataSelector);

    return (
        <TableBody>
            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    Начисление
                </TableCell>
                <ReportDataRow data={employeeSalaries}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={cumSalary}>Год</ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={4} align="center">
                    Суммы сверх предела
                </TableCell>

                <TableCell rowSpan={2} align="center">
                    на ОПС
                </TableCell>
                <ReportDataRow data={overRetirementLimit}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={cumOverRetirementLimit}>Год</ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={2} align="center">
                    в ФСС
                </TableCell>
                <ReportDataRow data={overSocialLimit}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={cumOverSocialLimit}>Год</ReportDataRow>
            </TableRow>

            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    База для начисления взносов на ОПС
                </TableCell>
                <ReportDataRow data={insuranceRetirementBase}>
                    Месяц
                </ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={insuranceRetiremencumtBase}>
                    Год
                </ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    База для начисления взносов на ФСС
                </TableCell>
                <ReportDataRow data={insuranceSocialBase}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={insuranceSocialcumBase}>Год</ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    Начислено взносов на ОПС
                </TableCell>
                <ReportDataRow data={insuranceRetirement}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={insurancecumRetirement}>Год</ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    Начислено взносов на ОМС
                </TableCell>
                <ReportDataRow data={insuranceMedical}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={insurancecumMedical}>Год</ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    Начислено взносов на ФСС
                </TableCell>
                <ReportDataRow data={insuranceSocial}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={insurancecumSocial}>Год</ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    Начислено взносов на НС и ПЗ
                </TableCell>
                <ReportDataRow data={insuranceAccident}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={insurancecumAccident}>Год</ReportDataRow>
            </TableRow>
            <TableRow>
                <TableCell rowSpan={2} colSpan={2} align="center">
                    НДФЛ
                </TableCell>
                <ReportDataRow data={PIT}>Месяц</ReportDataRow>
            </TableRow>
            <TableRow>
                <ReportDataRow data={PITcumArr}>Год</ReportDataRow>
            </TableRow>
        </TableBody>
    );
};

export default ReportBody;
