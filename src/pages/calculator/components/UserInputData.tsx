import { Container, Divider, Stack, Typography } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import { UserInputField } from "../exports/components";
import {
    setTaxExpanses,
    setTaxIncome,
    setTaxSalary,
} from "@calcstore/calculator-reducer";
import { CalcActionButtons } from "../exports/components";
import { useFontHeaders } from "@customhooks/useFontHeader";

const UserInputData: React.FC<{ toggleDialog: () => void }> = ({
    toggleDialog,
}) => {
    const dispatch = useTypedDispatch();
    const { income, expenses, salary } = useTypedSelector(
        (state) => state.calcSlice
    );

    const getIncomeValue = (value: number) => {
        dispatch(setTaxIncome(value));
    };
    const getExpensesValue = (value: number) => {
        dispatch(setTaxExpanses(value));
    };
    const getSalaryValue = (value: number) => {
        dispatch(setTaxSalary(value));
    };

    const [headersTextColor] = useFontHeaders();

    return (
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
                <Typography variant="h5">
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
                <UserInputField value={income} getNumberValue={getIncomeValue}>
                    Доходы
                </UserInputField>
                <br />
                <UserInputField
                    value={expenses}
                    getNumberValue={getExpensesValue}
                >
                    Расходы
                </UserInputField>

                <br />
                <UserInputField value={salary} getNumberValue={getSalaryValue}>
                    Зарплата
                </UserInputField>
                <CalcActionButtons toggleDialog={toggleDialog} />
            </Stack>
        </Container>
    );
};

export default UserInputData;
