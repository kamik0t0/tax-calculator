import { CustomContext } from "@customhooks/customContext";
import { useFontHeaders } from "@customhooks/useFontHeader";
import { useToggle } from "@customhooks/useToggle";
import { toPercentView } from "@helpers/currencyFormat";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import {
    CalcDataReportButton,
    OutputHeaderWrapper,
    OutputInfoCol,
    Reports,
} from "../exports/components";
import { IEHeaders, LLCHeaders } from "../exports/utils";

export const [useCalcReports, CalcReportsProvider] = CustomContext<{
    isIncomeIEDialog: boolean;
    isIncomeLLCDialog: boolean;
    isExpensesIEDialog: boolean;
    isExpensesLLCDialog: boolean;
    isBasicIEDialog: boolean;
    isBasicLLCDialog: boolean;
    toggleIncomeIEDialog: () => void;
    toggleIncomeLLCDialog: () => void;
    toggleExpensesIEDialog: () => void;
    toggleExpensesLLCDialog: () => void;
    toggleBasicIEDialog: () => void;
    toggleBasicLLCDialog: () => void;
}>();

const CalcDataOutput: React.FC = () => {
    const [isIncomeIEDialog, toggleIncomeIEDialog] = useToggle(false);
    const [isIncomeLLCDialog, toggleIncomeLLCDialog] = useToggle(false);
    const [isExpensesIEDialog, toggleExpensesIEDialog] = useToggle(false);
    const [isExpensesLLCDialog, toggleExpensesLLCDialog] = useToggle(false);
    const [isBasicIEDialog, toggleBasicIEDialog] = useToggle(false);
    const [isBasicLLCDialog, toggleBasicLLCDialog] = useToggle(false);
    const context = {
        isIncomeIEDialog,
        isIncomeLLCDialog,
        isExpensesIEDialog,
        isExpensesLLCDialog,
        isBasicIEDialog,
        isBasicLLCDialog,
        toggleIncomeIEDialog,
        toggleIncomeLLCDialog,
        toggleExpensesIEDialog,
        toggleExpensesLLCDialog,
        toggleBasicIEDialog,
        toggleBasicLLCDialog,
    };
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
                    spacing={2.85}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CalcDataReportButton
                        toggleIncomeIEDialog={toggleIncomeIEDialog}
                        value={taxIncomeIE}
                    />
                    <CalcDataReportButton
                        toggleIncomeIEDialog={toggleExpensesIEDialog}
                        value={taxIncomeExpensesIE}
                    />
                    <CalcDataReportButton
                        toggleIncomeIEDialog={toggleBasicIEDialog}
                        value={taxBasicIE}
                    />
                </Stack>
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography align="right" sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeIE)}
                    </Typography>
                    <Typography align="right" sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeExpensesIE)}
                    </Typography>
                    <Typography align="right" sx={valueTextColor}>
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
                    spacing={2.85}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CalcDataReportButton
                        toggleIncomeIEDialog={toggleIncomeLLCDialog}
                        value={taxIncomeLLC}
                    />
                    <CalcDataReportButton
                        toggleIncomeIEDialog={toggleExpensesLLCDialog}
                        value={taxIncomeExpensesLLC}
                    />
                    <CalcDataReportButton
                        toggleIncomeIEDialog={toggleBasicLLCDialog}
                        value={taxBasicLLC}
                    />
                </Stack>
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography align="right" sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeLLC)}
                    </Typography>
                    <Typography align="right" sx={valueTextColor}>
                        {toPercentView.format(burdenIncomeExpensesLLC)}
                    </Typography>
                    <Typography align="right" sx={valueTextColor}>
                        {toPercentView.format(burdenBasicLLC)}
                    </Typography>
                </Stack>
            </Stack>
            <CalcReportsProvider value={context}>
                <Reports />
            </CalcReportsProvider>
            {/* <IncomeIEReport
                isIncomeDialog={isIncomeIEDialog}
                toggleIncomeDialog={toggleIncomeIEDialog}
            />
            <IncomeLLCReport
                isDialog={isIncomeLLCDialog}
                toggleDialog={toggleIncomeLLCDialog}
            />
            <ExpensesIEReport
                isDialog={isExpensesIEDialog}
                toggleDialog={toggleExpensesIEDialog}
            />
            <ExpensesLLCReport
                isDialog={isExpensesLLCDialog}
                toggleDialog={toggleExpensesLLCDialog}
            />
            <BasicIEReport
                isDialog={isBasicIEDialog}
                toggleDialog={toggleBasicIEDialog}
            />
            <BasicLLCReport
                isDialog={isBasicLLCDialog}
                toggleDialog={toggleBasicLLCDialog}
            /> */}
        </Container>
    );
};

export default CalcDataOutput;
