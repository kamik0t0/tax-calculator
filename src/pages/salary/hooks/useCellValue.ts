import React from "react";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateSalary } from "@salarystore/salary-reducer";
import { IEmployee } from "../types/salary";

export const useCellValue = (
    index: number,
    prop: string,
    table: string,
    switchInput: () => void,
    employee: IEmployee
) => {
    const dispatch = useTypedDispatch();

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value);

    const setValue = (value: string) => {
        if (employee.name.length === 0) {
            return alert("Выберите сотрудника либо удалите строку");
        }
        dispatch(updateSalary(value, table, index.toString(), prop));
    };

    const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            switchInput();
            return setValue(ChangeEvent.target.value);
        }
    };

    return [getValue, keyDown] as const;
};
