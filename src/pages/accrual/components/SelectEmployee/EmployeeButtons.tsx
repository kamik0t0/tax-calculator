import {
    setEmployeeId,
    setIsDialogEmployee,
} from "@dialogstore/dialog-reducer";
import { Icon, IconButton } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import React, { useState } from "react";
import { useEmployeeSelectors } from "../../exports/hooks";

const EmployeeButtons: React.FC<{
    employeeId: string | undefined;
    handleSwitchInput: () => void;
}> = ({ employeeId, handleSwitchInput }) => {
    const { selectEmployeeById } = useEmployeeSelectors();
    const { isDialogEmployee } = useTypedSelector((state) => state.dialogSlice);
    const [ModalComponent, setModalComponent] = useState<React.FC | null>(null);

    const employee = selectEmployeeById(employeeId);

    const dispatch = useTypedDispatch();

    const openDialog = async () => {
        const { default: EmployeeDialog } = await import(
            "../../../employees/components/EmployeeDialog/EmployeeDialog"
        );
        dispatch(setEmployeeId(employee?.id || ""));
        dispatch(setIsDialogEmployee(true));
        setModalComponent(() => EmployeeDialog);
    };

    return (
        <>
            {employee ? (
                <IconButton
                    color="primary"
                    aria-label="add"
                    sx={{ padding: 0.4 }}
                    onClick={openDialog}
                >
                    <Icon color="primary" fontSize="medium">
                        edit
                    </Icon>
                </IconButton>
            ) : (
                <IconButton
                    color="primary"
                    aria-label="add"
                    sx={{ padding: 0.4 }}
                    onClick={openDialog}
                >
                    <Icon color="primary" fontSize="medium">
                        add_circle
                    </Icon>
                </IconButton>
            )}
            <IconButton
                color="primary"
                aria-label="add"
                sx={{ padding: 0.4 }}
                onClick={handleSwitchInput}
            >
                <Icon color="success" fontSize="medium">
                    check_circle
                </Icon>
            </IconButton>
            {isDialogEmployee && ModalComponent ? <ModalComponent /> : null}
        </>
    );
};

export default EmployeeButtons;
