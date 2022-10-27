import { setIsDialogEmployee } from "@dialogstore/dialog-reducer";
import { Icon, IconButton } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { setEmployeeById } from "@salarystore/salary-reducer";
import React from "react";

const EmployeeButtons: React.FC<{
    employeeId: string | undefined;
    handleSwitchInput: () => void;
}> = ({ employeeId, handleSwitchInput }) => {
    const { employees } = useTypedSelector((state) => state.salarySlice);

    // определяется сотрудник по которому изменяются начисления
    const employee = employees.find((employee) => employee.id === employeeId);
    const dispatch = useTypedDispatch();
    const openDialog = () => {
        dispatch(setEmployeeById(employee?.id || ""));
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
