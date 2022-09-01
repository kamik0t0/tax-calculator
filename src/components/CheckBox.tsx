import { Checkbox } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { IInvoice } from "../interfaces/IInvoice";
import { useTypedDispatch } from "../redux/hooks/hooks";

const CheckBox: FC<{
    index: number;
    action: ActionCreatorWithPayload<IInvoice[]>;
    invoices: IInvoice[];
    isChecked: boolean;
}> = ({ index, action, invoices, isChecked }) => {
    const dispatch = useTypedDispatch();
    const handleChange = () => {
        const InvoicesToDispatch = [...invoices].map((invoice: IInvoice) =>
            Object.assign({}, invoice)
        );
        InvoicesToDispatch[index].checked = !InvoicesToDispatch[index].checked;
        dispatch(action(InvoicesToDispatch));
    };

    return (
        <Checkbox
            checked={isChecked}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
        />
    );
};

export default CheckBox;
