import { Box, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React, { useMemo } from "react";
import { Limits, getInsuranceRates } from "../exports/utils";

const ReportHeaderCol: React.FC<{
    children: string;
    data: string | number;
}> = ({ children, data }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography>{children}</Typography>
            <Typography>{data}</Typography>
        </Box>
    );
};

const ReportHeaderColsWrapper: React.FC = () => {
    const { rateCode } = useTypedSelector((state) => state.salarySlice);
    const rates = useMemo(() => getInsuranceRates(rateCode), [rateCode]);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 850,
            }}
        >
            <ReportHeaderCol data={Limits.retirement}>
                Предел ОПС
            </ReportHeaderCol>
            <ReportHeaderCol data={Limits.social}>Предел ФСС</ReportHeaderCol>
            <ReportHeaderCol data={rateCode}>Код тарифа</ReportHeaderCol>
            <ReportHeaderCol data={rates.ret}>Ставка ОПС</ReportHeaderCol>
            <ReportHeaderCol data={rates.med}>Ставка ОМС</ReportHeaderCol>
            <ReportHeaderCol data={rates.social}>Ставка ФСС</ReportHeaderCol>
            <ReportHeaderCol data={rates.accident}>
                Ставка НС и ПЗ
            </ReportHeaderCol>
        </Box>
    );
};

export default ReportHeaderColsWrapper;
