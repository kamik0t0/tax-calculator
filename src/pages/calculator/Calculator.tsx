import {
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import NumberField from "./components/NumberField";
import React from "react";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    setTaxIncome,
    setTaxExpanses,
    setTaxSalary,
    calculateTaxes,
    fillWithAvailableData,
} from "@calcstore/calculator-reducer";
import { toRU } from "@helpers/currencyFormat";
import { totalSalarySelector } from "../../redux/selectors/salarySummSelector";

const Calculator: React.FC = (props) => {
    const dispatch = useTypedDispatch();
    const {
        income,
        expenses,
        salary,
        burdenIncomeIE,
        burdenIncomeExpensesIE,
        burdenBasicIE,
        burdenIncomeLLC,
        burdenIncomeExpensesLLC,
        burdenBasicLLC,
    } = useTypedSelector((state) => state.calcSlice);

    const VATIncomeSumm = useTypedSelector(
        (state) => state.invoiceSlice.summary.sales.summ
    );
    const VATExpensesSumm = useTypedSelector(
        (state) => state.invoiceSlice.summary.purches.summ
    );
    const SalarySumm = useTypedSelector(totalSalarySelector);

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

    const theme = useTheme();
    const headersTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };
    const valueTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };

    const getIncomeValue = (value: number) => {
        dispatch(setTaxIncome(value));
    };
    const getExpensesValue = (value: number) => {
        dispatch(setTaxExpanses(value));
    };
    const getSalaryValue = (value: number) => {
        dispatch(setTaxSalary(value));
    };
    const getAvailableData = () =>
        dispatch(
            fillWithAvailableData(
                VATIncomeSumm,
                VATExpensesSumm + SalarySumm,
                SalarySumm
            )
        );
    return (
        <>
            <br />
            <Container
                maxWidth="xl"
                sx={{
                    overflowY: "auto",
                    height: "85vh",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        flexBasis: "40%",
                    }}
                >
                    <Stack direction="column">
                        <Typography variant="h5" sx={headersTextColor}>
                            Планируемые показатели за год
                        </Typography>
                        <br />
                        <Divider
                            orientation="horizontal"
                            variant="fullWidth"
                            flexItem
                            light={true}
                        />
                        <br />
                        <Box
                            sx={{
                                minWidth: "400px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography>Доходы: </Typography>
                            <NumberField
                                label="Доходы"
                                value={income}
                                getNumberValue={getIncomeValue}
                            />
                        </Box>
                        <br />
                        <Box
                            sx={{
                                minWidth: "400px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography>Расходы: </Typography>
                            <NumberField
                                label="Расходы"
                                value={expenses}
                                getNumberValue={getExpensesValue}
                            />
                        </Box>
                        <br />
                        <Box
                            sx={{
                                minWidth: "400px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography>Зарплата: </Typography>
                            <NumberField
                                label="Зарплата"
                                value={salary}
                                getNumberValue={getSalaryValue}
                            />
                        </Box>

                        <br />
                        <br />
                        <Box
                            sx={{
                                minWidth: "400px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                size="large"
                                variant="outlined"
                                onClick={getAvailableData}
                                sx={{
                                    width: "150px",
                                }}
                            >
                                Заполнить
                            </Button>
                            <Button
                                size="large"
                                variant="outlined"
                                sx={{
                                    width: "150px",
                                }}
                            >
                                Ставки
                            </Button>
                        </Box>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                        <Button
                            size="large"
                            variant="contained"
                            onClick={() => dispatch(calculateTaxes())}
                            sx={{
                                width: "200px",
                                alignSelf: "center",
                            }}
                        >
                            Рассчитать
                        </Button>
                    </Stack>
                </Container>
                <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                    light={true}
                />
                <Container
                    maxWidth="md"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack direction="column">
                            <Typography variant="h6" sx={headersTextColor}>
                                Налоговые режимы ИП
                            </Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography variant="h6" sx={headersTextColor}>
                                Сумма налогов
                            </Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography variant="h6" sx={headersTextColor}>
                                Доля налогов в доходах
                            </Typography>
                        </Stack>
                    </Stack>
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
                        <Stack
                            spacing={4}
                            sx={{
                                display: "flex",
                                alignContent: "space-between",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>УСН (доходы)</Typography>
                            <Typography>УСН (доходы-расходы)</Typography>
                            <Typography>Общий</Typography>
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
                                {burdenIncomeIE}%
                            </Typography>
                            <Typography sx={valueTextColor}>
                                {burdenIncomeExpensesIE}%
                            </Typography>
                            <Typography sx={valueTextColor}>
                                {burdenBasicIE}%
                            </Typography>
                        </Stack>
                    </Stack>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack direction="column">
                            <Typography variant="h6" sx={headersTextColor}>
                                Налоговые режимы ООО
                            </Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography variant="h6" sx={headersTextColor}>
                                Сумма налогов
                            </Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography variant="h6" sx={headersTextColor}>
                                Доля налогов в доходах
                            </Typography>
                        </Stack>
                    </Stack>
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
                        <Stack
                            spacing={4}
                            sx={{
                                display: "flex",
                                alignContent: "space-between",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>УСН (доходы)</Typography>
                            <Typography>УСН (доходы-расходы)</Typography>
                            <Typography>Общий</Typography>
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
                                {burdenIncomeLLC}%
                            </Typography>
                            <Typography sx={valueTextColor}>
                                {burdenIncomeExpensesLLC}%
                            </Typography>
                            <Typography sx={valueTextColor}>
                                {burdenBasicLLC}%
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Container>
        </>
    );
};

export default Calculator;
