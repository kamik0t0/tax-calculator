import { Box, Stack, Tab, Tabs as MaterialTabs } from "@mui/material";
import React, { FC } from "react";
import { useLocalStorage } from "@customhooks/useLocalStorage";
import { useTypedSelector } from "@reduxhooks/hooks";
import {
    calcSummary,
    setLocalStorage,
    updateSalaries,
} from "@salarystore/salary-reducer";
import TabPanel from "@sharedcomponents/TabPanel";
import { a11yProps } from "@utils/a11yProps";
import { SalaryTable, SelectTaxRate } from "./exports/components";
import { Months, MonthsDisplay } from "./utils/months";

const Salary: FC = () => {
    const { months } = useTypedSelector((state) => state.salarySlice);

    const watchedJan = useLocalStorage(
        Months.jan,
        months.jan.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedFeb = useLocalStorage(
        Months.feb,
        months.feb.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedMarch = useLocalStorage(
        Months.march,
        months.march.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedApril = useLocalStorage(
        Months.april,
        months.april.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedMay = useLocalStorage(
        Months.may,
        months.may.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedJune = useLocalStorage(
        Months.june,
        months.june.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedJuly = useLocalStorage(
        Months.july,
        months.july.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedAug = useLocalStorage(
        Months.aug,
        months.aug.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedSep = useLocalStorage(
        Months.sep,
        months.sep.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedOct = useLocalStorage(
        Months.oct,
        months.oct.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedNov = useLocalStorage(
        Months.nov,
        months.nov.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const watchedDec = useLocalStorage(
        Months.dec,
        months.dec.salary,
        updateSalaries,
        setLocalStorage,
        calcSummary
    );

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <MaterialTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered={true}
                    sx={{ height: 50 }}
                >
                    <Tab label={MonthsDisplay.jan} {...a11yProps(0)} />
                    <Tab label={MonthsDisplay.feb} {...a11yProps(1)} />
                    <Tab label={MonthsDisplay.march} {...a11yProps(2)} />
                    <Tab label={MonthsDisplay.april} {...a11yProps(3)} />
                    <Tab label={MonthsDisplay.may} {...a11yProps(4)} />
                    <Tab label={MonthsDisplay.june} {...a11yProps(5)} />
                    <Tab label={MonthsDisplay.july} {...a11yProps(6)} />
                    <Tab label={MonthsDisplay.aug} {...a11yProps(7)} />
                    <Tab label={MonthsDisplay.sep} {...a11yProps(8)} />
                    <Tab label={MonthsDisplay.oct} {...a11yProps(9)} />
                    <Tab label={MonthsDisplay.nov} {...a11yProps(10)} />
                    <Tab label={MonthsDisplay.dec} {...a11yProps(11)} />
                </MaterialTabs>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        mb: 1,
                        mt: 1,
                    }}
                ></Box>
            </Box>
            <Stack spacing={1} sx={{ mt: 1 }}>
                <SelectTaxRate />
            </Stack>
            <TabPanel value={value} index={0}>
                <SalaryTable
                    salary={watchedJan}
                    summary={months.jan.summary}
                    table={Months.jan}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SalaryTable
                    salary={watchedFeb}
                    summary={months.feb.summary}
                    table={Months.feb}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SalaryTable
                    salary={watchedMarch}
                    summary={months.march.summary}
                    table={Months.march}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <SalaryTable
                    salary={watchedApril}
                    summary={months.april.summary}
                    table={Months.april}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <SalaryTable
                    salary={watchedMay}
                    summary={months.may.summary}
                    table={Months.may}
                />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <SalaryTable
                    salary={watchedJune}
                    summary={months.june.summary}
                    table={Months.june}
                />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <SalaryTable
                    salary={watchedJuly}
                    summary={months.july.summary}
                    table={Months.july}
                />
            </TabPanel>
            <TabPanel value={value} index={7}>
                <SalaryTable
                    salary={watchedAug}
                    summary={months.aug.summary}
                    table={Months.aug}
                />
            </TabPanel>
            <TabPanel value={value} index={8}>
                <SalaryTable
                    salary={watchedSep}
                    summary={months.sep.summary}
                    table={Months.sep}
                />
            </TabPanel>
            <TabPanel value={value} index={9}>
                <SalaryTable
                    salary={watchedOct}
                    summary={months.oct.summary}
                    table={Months.oct}
                />
            </TabPanel>
            <TabPanel value={value} index={10}>
                <SalaryTable
                    salary={watchedNov}
                    summary={months.nov.summary}
                    table={Months.nov}
                />
            </TabPanel>
            <TabPanel value={value} index={11}>
                <SalaryTable
                    salary={watchedDec}
                    summary={months.dec.summary}
                    table={Months.dec}
                />
            </TabPanel>
        </>
    );
};

export default Salary;
