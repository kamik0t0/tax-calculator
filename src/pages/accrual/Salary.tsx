import { Box, Container, Tab, Tabs as MaterialTabs } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    updateEmployeesInSalaries,
    updateSalaries,
} from "@salarystore/salary-reducer";
import { a11yProps } from "@utils/a11yProps";
import React, { FC, useEffect } from "react";
import { useSalaryStorageSelector } from "../../App";
import { SelectTaxRate, TabPanelWrapper } from "./exports/components";
import { useEmployeeSelectors } from "./exports/hooks";
import { ISalaryStorage } from "./exports/interfaces";
import { salaryEmployeeDelete, salaryEmployeeUpdate } from "./exports/scripts";
import { Months, MonthsDisplay } from "./exports/utils";

const Salary: FC = () => {
    const dispatch = useTypedDispatch();
    const { months } = useTypedSelector((state) => state.salarySlice);
    const { selectEmployees, selectIds } = useEmployeeSelectors();
    const employees = selectEmployees();
    const ids = selectIds();

    const storageSalary: ISalaryStorage = useSalaryStorageSelector();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

    useEffect(() => {
        for (const month in months) {
            const salary = months[month].salary;
            const employeesToUpdate = salaryEmployeeUpdate(employees, salary);

            const leftSalaries = salaryEmployeeDelete(employees, salary);

            leftSalaries && dispatch(updateSalaries(leftSalaries, month));

            if (employeesToUpdate.length > 0)
                dispatch(updateEmployeesInSalaries(ids, employees));
        }
    }, [storageSalary.employees, employees]);

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
                <TabPanelWrapper
                    value={value}
                    index={0}
                    salary={storageSalary.jan}
                    summary={months.jan.summary}
                    table={Months.jan}
                />
                <TabPanelWrapper
                    value={value}
                    index={1}
                    salary={storageSalary.feb}
                    summary={months.feb.summary}
                    table={Months.feb}
                />
                <TabPanelWrapper
                    value={value}
                    index={2}
                    salary={storageSalary.march}
                    summary={months.march.summary}
                    table={Months.march}
                />
                <TabPanelWrapper
                    value={value}
                    index={3}
                    salary={storageSalary.april}
                    summary={months.april.summary}
                    table={Months.april}
                />
                <TabPanelWrapper
                    value={value}
                    index={4}
                    salary={storageSalary.may}
                    summary={months.may.summary}
                    table={Months.may}
                />
                <TabPanelWrapper
                    value={value}
                    index={5}
                    salary={storageSalary.june}
                    summary={months.june.summary}
                    table={Months.june}
                />
                <TabPanelWrapper
                    value={value}
                    index={6}
                    salary={storageSalary.july}
                    summary={months.july.summary}
                    table={Months.july}
                />
                <TabPanelWrapper
                    value={value}
                    index={7}
                    salary={storageSalary.aug}
                    summary={months.aug.summary}
                    table={Months.aug}
                />
                <TabPanelWrapper
                    value={value}
                    index={8}
                    salary={storageSalary.sep}
                    summary={months.sep.summary}
                    table={Months.sep}
                />
                <TabPanelWrapper
                    value={value}
                    index={9}
                    salary={storageSalary.oct}
                    summary={months.oct.summary}
                    table={Months.oct}
                />
                <TabPanelWrapper
                    value={value}
                    index={10}
                    salary={storageSalary.nov}
                    summary={months.nov.summary}
                    table={Months.nov}
                />
                <TabPanelWrapper
                    value={value}
                    index={11}
                    salary={storageSalary.dec}
                    summary={months.dec.summary}
                    table={Months.dec}
                />
            </Container>
        </>
    );
};

export default Salary;
