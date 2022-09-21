import { CustomContext } from "@customhooks/customContext";
import { useLocalStorage } from "@customhooks/useLocalStorage";
import { Box, Stack, Tab, Tabs as MaterialTabs } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import {
    calcSummary,
    setSalariesToStorage,
    updateSalaries,
} from "@salarystore/salary-reducer";
import TabPanel from "@sharedcomponents/TabPanel";
import { a11yProps } from "@utils/a11yProps";
import React, { FC } from "react";
import { SalaryTable, SelectTaxRate } from "./exports/components";
import { Months, MonthsDisplay } from "./exports/utils";

export const [useHandleClickOpen, DialogProvider] =
    CustomContext<[() => void, () => void]>();

const Salary: FC = () => {
    const { months } = useTypedSelector((state) => state.salarySlice);

    const Jan = useLocalStorage(
        Months.jan,
        months.jan.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Feb = useLocalStorage(
        Months.feb,
        months.feb.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const March = useLocalStorage(
        Months.march,
        months.march.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const April = useLocalStorage(
        Months.april,
        months.april.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const May = useLocalStorage(
        Months.may,
        months.may.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const June = useLocalStorage(
        Months.june,
        months.june.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const July = useLocalStorage(
        Months.july,
        months.july.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Aug = useLocalStorage(
        Months.aug,
        months.aug.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Sep = useLocalStorage(
        Months.sep,
        months.sep.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Oct = useLocalStorage(
        Months.oct,
        months.oct.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Nov = useLocalStorage(
        Months.nov,
        months.nov.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Dec = useLocalStorage(
        Months.dec,
        months.dec.salary,
        updateSalaries,
        setSalariesToStorage,
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
                    salary={Jan}
                    summary={months.jan.summary}
                    table={Months.jan}
                />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <SalaryTable
                    salary={Feb}
                    summary={months.feb.summary}
                    table={Months.feb}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SalaryTable
                    salary={March}
                    summary={months.march.summary}
                    table={Months.march}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <SalaryTable
                    salary={April}
                    summary={months.april.summary}
                    table={Months.april}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <SalaryTable
                    salary={May}
                    summary={months.may.summary}
                    table={Months.may}
                />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <SalaryTable
                    salary={June}
                    summary={months.june.summary}
                    table={Months.june}
                />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <SalaryTable
                    salary={July}
                    summary={months.july.summary}
                    table={Months.july}
                />
            </TabPanel>
            <TabPanel value={value} index={7}>
                <SalaryTable
                    salary={Aug}
                    summary={months.aug.summary}
                    table={Months.aug}
                />
            </TabPanel>
            <TabPanel value={value} index={8}>
                <SalaryTable
                    salary={Sep}
                    summary={months.sep.summary}
                    table={Months.sep}
                />
            </TabPanel>
            <TabPanel value={value} index={9}>
                <SalaryTable
                    salary={Oct}
                    summary={months.oct.summary}
                    table={Months.oct}
                />
            </TabPanel>
            <TabPanel value={value} index={10}>
                <SalaryTable
                    salary={Nov}
                    summary={months.nov.summary}
                    table={Months.nov}
                />
            </TabPanel>
            <TabPanel value={value} index={11}>
                <SalaryTable
                    salary={Dec}
                    summary={months.dec.summary}
                    table={Months.dec}
                />
            </TabPanel>
        </>
    );
};

export default Salary;
