import { useLocalStorage } from "@customhooks/useLocalStorage";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import {
    deleteEmployee,
    setEmployeeById,
    setEmployees,
    setEmployeesToStorage,
} from "@salarystore/salary-reducer";
import React from "react";
import {
    setDialogEmployee,
    setDialogEmployeeDelete,
} from "@dialogstore/dialog-reducer";
import DeleteEmployeeDialog from "./deleteEmployeeDialog";
import { showSuccessSnackBar } from "@uistore/ui-reducer";

const Employees: React.FC = (props) => {
    const dispatch = useTypedDispatch();
    const { employees, employee } = useTypedSelector(
        (state) => state.salarySlice
    );
    const { dialogDeleteEmployee } = useTypedSelector(
        (state) => state.dialogSlice
    );

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

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                    width: 200,
                    mt: 2,
                    ml: 2,
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 400,
                    }}
                >
                    <Button variant="outlined" onClick={openEmployee}>
                        Добавить
                    </Button>
                    <Button variant="outlined" onClick={editEmployee}>
                        Редактировать
                    </Button>
                    <Button variant="outlined" onClick={deleteEmployeeHandler}>
                        Удалить
                    </Button>
                </Box>
            </Container>
            {dialogDeleteEmployee && <DeleteEmployeeDialog />}
        </>
    );
};

export default Employees;
