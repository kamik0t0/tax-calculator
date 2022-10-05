import { useLocalStorage } from "@customhooks/useLocalStorage";
import {
    Box,
    Button,
    Card,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    setEmployeeById,
    setEmployees,
    setEmployeesToStorage,
} from "@salarystore/salary-reducer";
import React from "react";
import {
    setDialogEmployee,
    setDialogEmployeeDelete,
    setDialogReportEmployee,
} from "@dialogstore/dialog-reducer";
import DeleteEmployeeDialog from "./deleteEmployeeDialog";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import { EmployeeDialog } from "../accrual/exports/components";
import { timestampToNativeToLocaleString } from "@helpers/dateHelpers";
import EmployeeReportDialog from "./employeeReportDialog";

const Employees: React.FC = () => {
    const dispatch = useTypedDispatch();
    const { employees, employee } = useTypedSelector(
        (state) => state.salarySlice
    );
    const { dialogDeleteEmployee, dialogEmployee, dialogReportEmployee } =
        useTypedSelector((state) => state.dialogSlice);

    const watchedEmployees = useLocalStorage(
        "employees",
        employees,
        setEmployees,
        setEmployeesToStorage
    );

    const handleSelectEmployee = (event: SelectChangeEvent<string>) => {
        const employeeId = event.target.value;
        dispatch(setEmployeeById(employeeId));
    };

    const openEmployee = () => {
        dispatch(setEmployeeById(""));
        dispatch(setDialogEmployee(true));
    };
    const editEmployee = () => {
        if (employee.id !== "") {
            dispatch(setDialogEmployee(true));
        } else {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Сотрудник не выбран",
                })
            );
            return;
        }
    };
    const deleteEmployeeHandler = () => {
        if (employee.id !== "") {
            dispatch(setDialogEmployeeDelete(true));
        } else {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Сотрудник не выбран",
                })
            );
            return;
        }
    };
    const reportEmployeeHandler = () => {
        if (employee.id !== "") {
            dispatch(setDialogReportEmployee(true));
        } else {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Сотрудник не выбран",
                })
            );
            return;
        }
    };

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 250,
                    width: "80vw",
                    mt: 2,
                }}
            >
                <FormControl sx={{ mb: 3 }}>
                    <InputLabel id="demo-simple-select-label">
                        Сотрудник
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={employee.id || ""}
                        label="Сотрудник"
                        onChange={handleSelectEmployee}
                        sx={{
                            width: 250,
                        }}
                    >
                        {watchedEmployees.map((employee) => (
                            <MenuItem key={employee.id} value={employee.id}>
                                {employee.surname + " " + employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TableContainer component={Card}>
                    <Table
                        stickyHeader
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                    >
                        {employee && (
                            <TableBody sx={{ height: 60 }}>
                                <TableRow>
                                    <TableCell align="center">
                                        {employee.surname +
                                            " " +
                                            employee.name +
                                            " " +
                                            employee?.patronymic}
                                    </TableCell>
                                    <TableCell align="center">
                                        {employee?.position}
                                    </TableCell>
                                    <TableCell align="center">
                                        {employee.birth
                                            ? timestampToNativeToLocaleString(
                                                  employee.birth
                                              )
                                            : ""}
                                    </TableCell>
                                    <TableCell align="center">
                                        {employee.sex
                                            ? employee.sex === "male"
                                                ? "Мужской"
                                                : "Женский"
                                            : ""}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 800,
                        mt: 3,
                    }}
                >
                    <Button variant="outlined" onClick={openEmployee}>
                        Добавить
                    </Button>
                    <Button variant="outlined" onClick={deleteEmployeeHandler}>
                        Удалить
                    </Button>
                    <Button variant="outlined" onClick={editEmployee}>
                        Редактировать
                    </Button>
                    <Button variant="outlined" onClick={reportEmployeeHandler}>
                        Отчет по начислениям
                    </Button>
                </Box>
            </Container>
            {dialogDeleteEmployee && <DeleteEmployeeDialog />}
            {dialogEmployee && <EmployeeDialog />}
            {dialogReportEmployee && <EmployeeReportDialog />}
        </>
    );
};

export default Employees;
