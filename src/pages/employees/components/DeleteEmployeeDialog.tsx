import { useSnack } from "@customhooks/useSnack";
import { setIsDialogEmployeeDelete } from "@dialogstore/dialog-reducer";
import { DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React, { FC } from "react";
import { useEmployeeActions } from "../hooks/useEmployeeActions";

// TODO: придумать как вызывать диалог с разными children
const DeleteEmployeeDialog: FC = () => {
    const dispatch = useTypedDispatch();
    const { employeeId, isDialogDeleteEmployee } = useTypedSelector(
        (state) => state.dialogSlice
    );
    const { deleteEmployee } = useEmployeeActions();
    const showSnack = useSnack();

    const handleClose = () => {
        deleteEmployee(employeeId);
        showSnack("success", "Сотрудник удаден");
        dispatch(setIsDialogEmployeeDelete(false));
    };

    const handleCencel = () => dispatch(setIsDialogEmployeeDelete(false));

    return (
        <Dialog open={isDialogDeleteEmployee || false} fullWidth>
            <DialogTitle>Удалить сотрудника?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Удаление сотрудника приведет к удалению связанных с ним
                    начислений во всех таблицах
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCencel}>Отмена</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteEmployeeDialog;
