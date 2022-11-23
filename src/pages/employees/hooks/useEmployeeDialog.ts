import { useSnack } from "@customhooks/useSnack";
import { setIsDialogEmployee } from "@dialogstore/dialog-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import {
    addEmployee,
    setEmployee,
    updateCivilContract,
    updateEmployee,
} from "@salarystore/salary-reducer";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { IEmployee } from "../exports/types";

export const useEmployeeDialog = () => {
    const dispatch = useTypedDispatch();
    const { employee } = useTypedSelector((state) => state.salarySlice);
    const [dialogEmployee, setEmployeeValues] = useState<IEmployee>(employee);
    const showSnack = useSnack();

    const handleClose = () => {
        if (dialogEmployee.id.length > 0) {
            dispatch(updateEmployee(dialogEmployee));
            showSnack("success", "Данные сотрудника успешно обновлены!");
            dispatch(setIsDialogEmployee(false));
            dispatch(setEmployee(dialogEmployee));
        } else {
            if (
                dialogEmployee.name.length === 0 ||
                dialogEmployee.surname.length === 0
            )
                return showSnack("error", "Заполните поля со звездочкой");
            const employee = Object.assign({}, dialogEmployee, {
                id: nanoid(6),
            });

            dispatch(addEmployee(employee as unknown as IEmployee));
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
        dispatch(updateCivilContract(event.target.checked, dialogEmployee.id));
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
        employeeId: employee.id,
    };
};
