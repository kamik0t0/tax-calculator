import {
    setEmployeeId,
    setIsDialogEmployee,
} from "@dialogstore/dialog-reducer";
import { Icon, IconButton } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import React from "react";
import { useEmployeeSelectors } from "../../exports/hooks";

const EmployeeButtons: React.FC<{
    employeeId: string | undefined;
    handleSwitchInput: () => void;
}> = ({ employeeId, handleSwitchInput }) => {
    const { selectEmployeeById } = useEmployeeSelectors();
    const employee = selectEmployeeById(employeeId);

    const dispatch = useTypedDispatch();
    const openDialog = () => {
        dispatch(setEmployeeId(employee?.id || ""));
        dispatch(setIsDialogEmployee(true));
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
        </>
    );
};

export default EmployeeButtons;
