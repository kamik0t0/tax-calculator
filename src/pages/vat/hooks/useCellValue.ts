import React, { useState } from "react";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateInvoice } from "@invoicesstore/invoice-reducer";
import { SelectChangeEvent } from "@mui/material";

export const useCellValue = (
    index: number,
    prop: string,
    table: string,
    vatRate: number = 0.2,
    switchInput: () => void
) => {
    const dispatch = useTypedDispatch();
    const [rate, setRate] = useState<string>(vatRate ? vatRate.toString() : "");

    const getInputValue = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(event.target.value);

    const getSelectValue = (event: SelectChangeEvent<string>) =>
        setSelectValue(event.target.value);

    const setInputValue = (value: string) =>
        dispatch(updateInvoice(value, table, index.toString(), prop));
    const setSelectValue = (value: string) => {
        setRate(value);
        dispatch(updateInvoice(value, table, index.toString(), prop));
    };

    const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            const ChangeEvent =
                event as unknown as React.ChangeEvent<HTMLInputElement>;
            switchInput();
            return setInputValue(ChangeEvent.target.value);
        }
    };

    return [getInputValue, getSelectValue, keyDown, rate] as const;
};
