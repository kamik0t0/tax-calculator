import { useFontHeaders } from "@customhooks/useFontHeader";
import { toPercentView, toRU } from "@helpers/currencyFormat";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { OutputHeaderWrapper, OutputInfoCol } from "../exports/components";
import { LLCHeaders, IEHeaders } from "../exports/utils";

// TODO: переписать отображение/вычисление налоговой нагрузки в процентах
const CalcDataOutput: React.FC = () => {
    const {
        burdenIncomeIE,
        burdenIncomeExpensesIE,
        burdenBasicIE,
        burdenIncomeLLC,
        burdenIncomeExpensesLLC,
        burdenBasicLLC,
    } = useTypedSelector((state) => state.calcSlice);

    const { total: taxIncomeIE } = useTypedSelector(
        (state) => state.calcSlice.taxIncomeIE
    );
    const { total: taxIncomeExpensesIE } = useTypedSelector(
        (state) => state.calcSlice.taxIncomeExpensesIE
    );
    const { total: taxBasicIE } = useTypedSelector(
        (state) => state.calcSlice.taxBasicIE
    );
    const { total: taxIncomeLLC } = useTypedSelector(
        (state) => state.calcSlice.taxIncomeLLC
    );
    const { total: taxIncomeExpensesLLC } = useTypedSelector(
        (state) => state.calcSlice.taxIncomeExpensesLLC
    );
    const { total: taxBasicLLC } = useTypedSelector(
        (state) => state.calcSlice.taxBasicLLC
    );
    const [_, valueTextColor] = useFontHeaders();
    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <OutputHeaderWrapper headers={LLCHeaders} />
            <br />
            <Divider
                orientation="horizontal"
                variant="fullWidth"
                flexItem
                light={true}
            />
            <br />
            <br />
            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: 15,
                }}
            >
                <OutputInfoCol />
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        alignContent: "space-between",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={valueTextColor}>
                        {toRU.format(taxIncomeIE)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toRU.format(taxIncomeExpensesIE)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toRU.format(taxBasicIE)}
                    </Typography>
                </Stack>
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        alignContent: "space-between",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeIE)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeExpensesIE)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toPercentView.format(burdenBasicIE)}
                    </Typography>
                </Stack>
            </Stack>

            <OutputHeaderWrapper headers={IEHeaders} />
            <br />
            <Divider
                orientation="horizontal"
                variant="fullWidth"
                flexItem
                light={true}
            />
            <br />
            <br />
            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <OutputInfoCol />
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        alignContent: "space-between",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={valueTextColor}>
                        {toRU.format(taxIncomeLLC)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toRU.format(taxIncomeExpensesLLC)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toRU.format(taxBasicLLC)}
                    </Typography>
                </Stack>
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        alignContent: "space-between",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeLLC)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeExpensesLLC)}
                    </Typography>
                    <Typography sx={valueTextColor}>
                        {toPercentView.format(burdenBasicLLC)}
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default CalcDataOutput;
