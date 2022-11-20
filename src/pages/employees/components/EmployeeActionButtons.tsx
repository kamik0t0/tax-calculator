import { Box, Button } from "@mui/material";
import { useEmployeeActions } from "../exports/hooks";
import React from "react";

const EmployeeActionButtons: React.FC = (props) => {
    const {
        openEmployee,
        editEmployee,
        deleteEmployeeHandler,
        reportEmployeeHandler,
    } = useEmployeeActions();
    return (
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
    );
};

export default EmployeeActionButtons;
