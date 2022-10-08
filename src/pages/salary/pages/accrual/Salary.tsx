import { useLocalStorage } from "@customhooks/useLocalStorage";
import { Box, Container, Tab, Tabs as MaterialTabs } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    calcSummary,
    setSalariesToStorage,
    updateSalaries,
    updateSalary,
} from "@salarystore/salary-reducer";
import { a11yProps } from "@utils/a11yProps";
import React, { FC, useEffect } from "react";
import { SelectTaxRate, TabPanelWrapper } from "./exports/components";
import { salaryEmployeeUpdate } from "./exports/scripts";
import { Months, MonthsDisplay } from "./exports/utils";
import { salaryEmployeeDelete } from "./exports/scripts";
import { ISalary } from "./types/salary";

// const TabPanelWrapper = React.lazy(
//     () => import("./components/TabPanelWrapper")
// );

const Salary: FC = () => {
    const dispatch = useTypedDispatch();
    const { months, employees } = useTypedSelector(
        (state) => state.salarySlice
    );
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

    useEffect(() => {
        for (const month in months) {
            const salary: ISalary[] = months[month].salary;
            const employee = salaryEmployeeUpdate(employees, salary);
            const leftSalaries = salaryEmployeeDelete(employees, salary);
            // порядок dispatch имеет значение! сначала диспатч оставшихся сотрудинков
            leftSalaries && dispatch(updateSalaries(leftSalaries, month));
            // затем обновления конкретного сотрудника. В ином случае обновления будут внесены, но диспатч оставшихся перезапишет обновленного сотрудника старыми значениями и новая информация будет доступна не сразу
            if (employee) {
                dispatch(
                    updateSalary(
                        employee.id,
                        month,
                        employee.index.toString(),
                        "employee"
                    )
                );
            }
        }
    }, [employees]);

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
            </Box>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        mt: 1,
                        mb: 3,
                    }}
                >
                    <SelectTaxRate />
                </Box>
                {/* <Suspense fallback={<>Loading</>}> */}

                <TabPanelWrapper
                    value={value}
                    index={0}
                    salary={Jan}
                    summary={months.jan.summary}
                    table={Months.jan}
                />
                <TabPanelWrapper
                    value={value}
                    index={1}
                    salary={Feb}
                    summary={months.feb.summary}
                    table={Months.feb}
                />
                <TabPanelWrapper
                    value={value}
                    index={2}
                    salary={March}
                    summary={months.march.summary}
                    table={Months.march}
                />
                <TabPanelWrapper
                    value={value}
                    index={3}
                    salary={April}
                    summary={months.april.summary}
                    table={Months.april}
                />
                <TabPanelWrapper
                    value={value}
                    index={4}
                    salary={May}
                    summary={months.may.summary}
                    table={Months.may}
                />
                <TabPanelWrapper
                    value={value}
                    index={5}
                    salary={June}
                    summary={months.june.summary}
                    table={Months.june}
                />
                <TabPanelWrapper
                    value={value}
                    index={6}
                    salary={July}
                    summary={months.july.summary}
                    table={Months.july}
                />
                <TabPanelWrapper
                    value={value}
                    index={7}
                    salary={Aug}
                    summary={months.aug.summary}
                    table={Months.aug}
                />
                <TabPanelWrapper
                    value={value}
                    index={8}
                    salary={Sep}
                    summary={months.sep.summary}
                    table={Months.sep}
                />
                <TabPanelWrapper
                    value={value}
                    index={9}
                    salary={Oct}
                    summary={months.oct.summary}
                    table={Months.oct}
                />
                <TabPanelWrapper
                    value={value}
                    index={10}
                    salary={Nov}
                    summary={months.nov.summary}
                    table={Months.nov}
                />
                <TabPanelWrapper
                    value={value}
                    index={11}
                    salary={Dec}
                    summary={months.dec.summary}
                    table={Months.dec}
                />
                {/* </Suspense> */}
            </Container>
        </>
    );
};

export default Salary;
