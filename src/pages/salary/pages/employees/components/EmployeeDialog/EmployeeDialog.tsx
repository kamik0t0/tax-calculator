import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTypedSelector } from "@reduxhooks/hooks";
import React, { FC } from "react";
import {
    EmployeeBirth,
    EmployeeIsCivil,
    EmployeeName,
    EmployeePosition,
    EmployeeSex,
} from "../../exports/components";
import { useEmployeeDialog } from "../../exports/hooks";

// TODO: придумать как вызывать диалог с разными children
const FormDialog: FC = () => {
    const { isDialogEmployee } = useTypedSelector((state) => state.dialogSlice);
    const {
        handleClose,
        handleCencel,
        handleName,
        handleSurname,
        handlePatronymic,
        handlePosition,
        handleBirthDate,
        handleCivilContract,
        handleSex,
        dialogEmployee,
        employeeId,
    } = useEmployeeDialog();

    return (
        <Dialog open={isDialogEmployee || false} fullWidth>
            <DialogContent>
                {employeeId ? (
                    <DialogContentText>
                        Изменение данных сотрудника:
                    </DialogContentText>
                ) : (
                    <DialogContentText>Новый сотрудник:</DialogContentText>
                )}
                <Box>
                    <Box
                        mb={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <EmployeeName
                            required={true}
                            value={dialogEmployee?.surname}
                            onChange={handleSurname}
                            label="Фамилия"
                        />
                        <EmployeeName
                            required={true}
                            value={dialogEmployee?.name}
                            onChange={handleName}
                            label="Имя"
                        />
                        <EmployeeName
                            required={false}
                            value={dialogEmployee?.patronymic}
                            onChange={handlePatronymic}
                            label="Отчество"
                        />
                    </Box>
                    <EmployeePosition
                        value={dialogEmployee?.position}
                        onChange={handlePosition}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            mt: 2,
                        }}
                    >
                        <EmployeeBirth
                            value={dialogEmployee?.birth}
                            onChange={handleBirthDate}
                        />
                        <EmployeeIsCivil
                            isChecked={dialogEmployee.civilContract}
                            onChange={handleCivilContract}
                        />
                        <EmployeeSex
                            sex={dialogEmployee?.sex}
                            onChange={handleSex}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCencel}>Отмена</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;
