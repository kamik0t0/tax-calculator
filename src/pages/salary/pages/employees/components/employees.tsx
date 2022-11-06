import { Container } from "@mui/material";
import { useTypedSelector } from "@reduxhooks/hooks";
import React from "react";
import {
    DeleteEmployeeDialog,
    EmployeeActionButtons,
    EmployeeDialog,
    EmployeeReportDialog,
    EmployeesList,
    ShowEmployee,
} from "../exports/components";

const Employees: React.FC = () => {
    const { isDialogDeleteEmployee, isDialogEmployee, isDialogReportEmployee } =
        useTypedSelector((state) => state.dialogSlice);

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 250,
                    width: "80vw",
                    mt: 2,
                }}
            >
                <EmployeesList />
                <ShowEmployee />
                <EmployeeActionButtons />
            </Container>
            {isDialogDeleteEmployee && <DeleteEmployeeDialog />}
            {isDialogEmployee && <EmployeeDialog />}
            {isDialogReportEmployee && <EmployeeReportDialog />}
        </>
    );
};

export default Employees;
