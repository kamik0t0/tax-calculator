import { useFontHeaders } from "@customhooks/useFontHeader";
import { toRU, toPercentView } from "@helpers/currencyFormat";
import { Stack, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";

const FinesResultContent: React.FC = () => {
    const { finesData, days, fineSumm } = useTypedSelector(
        (state) => state.fineSlice
    );

    const [headersTextColor] = useFontHeaders();
    return (
        <Stack
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                mb: 5,
                width: 350,
            }}
        >
            {finesData.length > 0 ? (
                <>
                    {finesData.map((fine, index) => (
                        <Typography key={index}>
                            {"+ "}({toRU.format(fine.debt)} х{" "}
                            {fine.days.toFixed()} дн. х{" "}
                            {toPercentView.format(fine.rate)} / {fine._fineRate}
                            )
                        </Typography>
                    ))}
                    <Typography
                        variant="h4"
                        mt={5}
                        mb={5}
                        sx={headersTextColor}
                    >
                        = {toRU.format(fineSumm)}
                    </Typography>
                    <Typography variant="h6" sx={headersTextColor}>
                        Просрочка {days.toFixed(0)} дней
                    </Typography>
                </>
            ) : (
                <Typography>
                    Проверьте правильность дат. При данных параметрах расчета
                    отсутствует период просрочки для начисления пени
                </Typography>
            )}
        </Stack>
    );
};

export default FinesResultContent;
