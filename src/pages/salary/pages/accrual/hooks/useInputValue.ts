import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateSalary } from "@salarystore/salary-reducer";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import React, { useState } from "react";
import { ISalary } from "../types/salary";

export const useInputValue = (
    index: number,
    prop: string,
    table: string,
    accrual: ISalary,
    children: any,
    disabled: boolean,
    setSelect: React.Dispatch<React.SetStateAction<boolean>>,
    select: boolean
) => {
    const dispatch = useTypedDispatch();
    const [prevValue, setPrevValue] = useState<string>(children);
    const [inputToggle, switchInput] = useState<boolean>(false);

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value);

    const setValue = (value: string) => {
        // запрет попытки редактирования начисления если графа сотрудник пуста
        if (accrual.name.length === 0)
            return dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Выберите сотрудника либо удалите строку",
                })
            );

        dispatch(updateSalary(value, table, index.toString(), prop));
    };

    const handleSwitchInput = () => {
        if (disabled) return;
        inputToggle &&
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Не забудьте пересчитать взносы",
                })
            );
        setSelect(!select);
        switchInput(!inputToggle);
        setPrevValue(children);
    };

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            handleSwitchInput();
            // уведомление
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Не забудьте пересчитать взносы",
                })
            );
            return setValue(ChangeEvent.target.value);
        }
        // возврат текущего значения
        if (event.code === "Escape") {
            handleSwitchInput();
            return setValue(prevValue);
        }
    };

    return [getValue, keyDownHandler, inputToggle, handleSwitchInput] as const;
};
