import { useSnack } from "@customhooks/useSnack";
import { setIsDialogEmployee } from "@dialogstore/dialog-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { updateEmployeesInSalaries } from "@salarystore/salary-reducer";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { IEmployee } from "../exports/types";
import { useEmployeeActions } from "./useEmployeeActions";
import { useEmployeeSelectors } from "./useEmployeeSelectors";

export const useEmployeeDialog = () => {
    const dispatch = useTypedDispatch();
    const { employeeId } = useTypedSelector((state) => state.dialogSlice);
    const { selectEmployeeById, selectEmployees } = useEmployeeSelectors();
    const { addEmployee, updateEmployee } = useEmployeeActions();
    const employee = selectEmployeeById(employeeId || "");
    const employees = selectEmployees();
    const [dialogEmployee, setEmployeeValues] = useState<IEmployee>(() =>
        employee !== undefined ? employee : ({} as IEmployee)
    );

    const showSnack = useSnack();

    const handleClose = () => {
        if (employee && employeeId) {
            updateEmployee(employeeId, dialogEmployee);
            dispatch(updateEmployeesInSalaries([employeeId], employees));
            showSnack("success", "Данные сотрудника успешно обновлены!");
            dispatch(setIsDialogEmployee(false));
        } else {
            if (
                dialogEmployee.name.length === 0 ||
                dialogEmployee.surname.length === 0
            )
                return showSnack("error", "Заполните поля со звездочкой");
            const employee = Object.assign({}, dialogEmployee, {
                id: nanoid(6),
            });
            addEmployee(employee);
            showSnack("success", "Сотрудник успешно добавлен!");
            dispatch(setIsDialogEmployee(false));
        }
    };

    const handleCencel = () => dispatch(setIsDialogEmployee(false));
    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, name: event.target.value });
    };
    const handleSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, surname: event.target.value });
    };
    const handlePatronymic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({
            ...dialogEmployee,
            patronymic: event.target.value,
        });
    };
    const handlePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, position: event.target.value });
    };
    const handleBirthDate = (date: Dayjs | null) => {
        if (date) {
            setEmployeeValues({
                ...dialogEmployee,
                birth: Date.parse(date.format()),
            });
        }
    };
    const handleSex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, sex: event.target.value });
    };
    const handleCivilContract = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmployeeValues({
            ...dialogEmployee,
            civilContract: event.target.checked,
        });
        employeeId && updateEmployee(employeeId, dialogEmployee);
    };

    return {
        handleClose,
        handleCencel,
        handleName,
        handleSurname,
        handlePatronymic,
        handlePosition,
        handleBirthDate,
        handleCivilContract,
        handleSex,
        dialogEmployee,
        employeeId: employee?.id,
    };
};
