import React, { useState } from "react";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateInvoice } from "@invoicesstore/invoice-reducer";
import { SelectChangeEvent } from "@mui/material";

export const useCellValue = (
    index: number,
    prop: string,
    table: string,
    vatRate: number = 0.2
) => {
    const dispatch = useTypedDispatch();
    const [rate, setRate] = useState<string>(vatRate ? vatRate.toString() : "");

    const getSelectValue = (event: SelectChangeEvent<string>) =>
        setSelectValue(event.target.value);

    const setSelectValue = (value: string) => {
        setRate(value);
        dispatch(updateInvoice(value, table, index.toString(), prop));
    };

    return [getSelectValue, rate] as const;
};
