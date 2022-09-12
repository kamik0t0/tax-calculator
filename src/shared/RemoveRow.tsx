import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, { FC } from "react";

const RemoveRow: FC<{ action: (index: number) => void; index: number }> = ({
    action,
    index,
}) => {
    const deleteRow = () => action(index);
    return (
        <IconButton onClick={deleteRow} aria-label="delete">
            <DeleteIcon />
        </IconButton>
    );
};

export default RemoveRow;
