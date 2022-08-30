import { Checkbox } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import { IInvoice } from "../interfaces/IInvoice";

const CheckBox: FC<{
    index: number;
    action: Dispatch<SetStateAction<IInvoice[]>>;
    isChecked: boolean;
}> = ({ index, action, isChecked }) => {
    const handleChange = () => {
        action((prev: IInvoice[]) => {
            prev[index].checked = !prev[index].checked;
            return [...prev];
        });
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
