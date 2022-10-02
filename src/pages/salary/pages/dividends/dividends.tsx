import { Box, TextField } from "@mui/material";
import Summary from "@sharedcomponents/Summary";
import React, { useState } from "react";

const Dividends: React.FC = () => {
    const [dividendsByAccrual, setDividendsByAccrual] = useState({
        pit: 0,
        pay: 0,
        summ: 0,
    });
    const [dividendsByPay, setDividendsByPay] = useState({
        pit: 0,
        pay: 0,
        summ: 0,
    });

    const handleDividendsByAccrual = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const summ = +event.target.value;
        const pit = Math.round((summ * 13) / 100);
        const pay = Math.round(summ - pit);
        setDividendsByAccrual(() => ({ pay, pit, summ }));
    };
    const handleDividendsByPay = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const pay = +event.target.value;
        const pit = Math.round((pay * 13) / 87);
        const summ = Math.round(pay + pit);
        setDividendsByPay(() => ({ pay, pit, summ }));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 200,
                mt: 3,
                ml: 3,
            }}
        >
            1. Расчет по начислению
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: 680,
                    justifyContent: "space-between",
                }}
            >
                <TextField
                    label="начисление"
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{ width: 150 }}
                    onChange={handleDividendsByAccrual}
                />
                <Summary text="НДФЛ" width={250} textVariant="body1">
                    {dividendsByAccrual.pit}
                </Summary>
                <Summary text="К выплате" width={250} textVariant="body1">
                    {dividendsByAccrual.pay}
                </Summary>
            </Box>
            2. Расчет по выплате
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: 680,
                    justifyContent: "space-between",
                }}
            >
                <TextField
                    label="на руки"
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{ width: 150 }}
                    onChange={handleDividendsByPay}
                />
                <Summary text="НДФЛ" width={250} textVariant="body1">
                    {dividendsByPay.pit}
                </Summary>
                <Summary text="Начислено" width={250} textVariant="body1">
                    {dividendsByPay.summ}
                </Summary>
            </Box>
        </Box>
    );
};

export default Dividends;
