import React from "react";
import { useTypedDispatch } from "../../../redux/hooks/hooks";
import { updateSalary } from "../../../redux/reducers/salary/salary-reducer";

export const useCellValue = (
    index: number,
    prop: string,
    table: string,
    switchInput: () => void
) => {
    const dispatch = useTypedDispatch();

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value);

    const setValue = (value: string) =>
        dispatch(updateSalary(value, table, index.toString(), prop));

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
