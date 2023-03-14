import { Box, Button } from "@mui/material";
import { useEmployeeDialogActions } from "../exports/hooks";
import React from "react";
import { useTypedSelector } from "@reduxhooks/hooks";

const EmployeeActionButtons: React.FC = () => {
    const { isDialogDeleteEmployee, isDialogEmployee, isDialogReportEmployee } =
        useTypedSelector((state) => state.dialogSlice);
    const {
        openEmployee,
        editEmployee,
        deleteEmployeeHandler,
        reportEmployeeHandler,
        DeleteEmployeeDialog,
        EmployeeDialog,
        EmployeeReportDialog,
    } = useEmployeeDialogActions();

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 800,
                    mt: 3,
                }}
            >
                <Button variant="outlined" onClick={openEmployee}>
                    Добавить
                </Button>
                <Button variant="outlined" onClick={deleteEmployeeHandler}>
                    Удалить
                </Button>
                <Button variant="outlined" onClick={editEmployee}>
                    Редактировать
                </Button>
                <Button variant="outlined" onClick={reportEmployeeHandler}>
                    Отчет по начислениям
                </Button>
            </Box>
            {isDialogDeleteEmployee && DeleteEmployeeDialog ? (
                <DeleteEmployeeDialog />
            ) : null}
            {isDialogEmployee && EmployeeDialog ? <EmployeeDialog /> : null}
            {isDialogReportEmployee && EmployeeReportDialog ? (
                <EmployeeReportDialog />
            ) : null}
        </>
    );
};

export default EmployeeActionButtons;
