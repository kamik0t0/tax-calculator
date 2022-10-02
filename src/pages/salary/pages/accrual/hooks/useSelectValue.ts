import React, { useState } from "react";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateSalary } from "@salarystore/salary-reducer";
import { SelectChangeEvent } from "@mui/material";

export const useSelectValue = (
    index: number,
    prop: string,
    table: string,
    defaultEmployeeId: string | undefined
) => {
    const dispatch = useTypedDispatch();
    // переключение select/cell
    const [select, setSelect] = useState<boolean>(false);
    const [employeeId, setEmployeeId] = useState<string>(
        defaultEmployeeId || ""
    );

    const handleSelectValue = (event: SelectChangeEvent<string>) => {
        setEmployeeId(event.target.value);
        dispatch(
            updateSalary(event.target.value, table, index.toString(), prop)
        );
    };

    return [employeeId, select, setSelect, handleSelectValue] as const;
};
