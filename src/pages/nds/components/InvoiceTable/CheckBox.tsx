import { Checkbox } from "@mui/material";
import React, { FC } from "react";
import { useTypedDispatch } from "../../../../redux/hooks/hooks";
import { setCheckBox } from "../../../../redux/reducers/invoice-reducer";

const CheckBox: FC<{
    index: number;
    table: string;
    isChecked: boolean;
}> = ({ index, table, isChecked }) => {
    const dispatch = useTypedDispatch();
    const handleChange = () => dispatch(setCheckBox(index, table));
    return (
        <Checkbox
            checked={isChecked}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
        />
    );
};

export default CheckBox;
