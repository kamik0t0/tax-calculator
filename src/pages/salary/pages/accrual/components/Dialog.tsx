import { setIsDialogEmployee } from "@dialogstore/dialog-reducer";
import { timestampToNativeHTMLStringConverter } from "@helpers/dateHelpers";
import { Box, Checkbox, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import {
    addEmployee,
    setEmployee,
    updateCivilContract,
    updateEmployee,
} from "@salarystore/salary-reducer";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import { Dayjs } from "dayjs";
import React, { FC, useState } from "react";
import { IEmployee } from "../exports/interfaces";

// TODO: придумать как вызывать диалог с разными children
const FormDialog: FC = () => {
    const dispatch = useTypedDispatch();
    const { employee } = useTypedSelector((state) => state.salarySlice);

    const [dialogEmployee, setEmployeeValues] = useState<IEmployee>(employee);
    const { isDialogEmployee } = useTypedSelector((state) => state.dialogSlice);

    const handleClose = () => {
        if (dialogEmployee.id.length > 0) {
            dispatch(updateEmployee(dialogEmployee));
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "success",
                    message: "Данные сотрудника успешно обновлены!",
                })
            );
            dispatch(setIsDialogEmployee(false));
            dispatch(setEmployee(dialogEmployee));
        } else {
            if (
                dialogEmployee.name.length === 0 ||
                dialogEmployee.surname.length === 0
            )
                return dispatch(
                    showSuccessSnackBar({
                        open: true,
                        severity: "error",
                        message: "Заполните поля со звездочкой",
                    })
                );

            const employee = Object.assign({}, dialogEmployee, {
                id: nanoid(6),
            });

            dispatch(addEmployee(employee as unknown as IEmployee));
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "success",
                    message: "Сотрудник успешно добавлен!",
                })
            );
            dispatch(setIsDialogEmployee(false));
        }
    };

    const handleCencel = () => dispatch(setIsDialogEmployee(false));
    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, name: event.target.value });
    };
    const handleSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, surname: event.target.value });
    };
    const handlePatronymic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({
            ...dialogEmployee,
            patronymic: event.target.value,
        });
    };
    const handlePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, position: event.target.value });
    };
    const handleBirthDate = (date: Dayjs | null) => {
        if (date) {
            setEmployeeValues({
                ...dialogEmployee,
                birth: Date.parse(date.format()),
            });
        }
    };
    const handleSex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeValues({ ...dialogEmployee, sex: event.target.value });
    };
    const handleCivilContract = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmployeeValues({
            ...dialogEmployee,
            civilContract: event.target.checked,
        });
        dispatch(updateCivilContract(event.target.checked, dialogEmployee.id));
    };

    return (
        <Dialog open={isDialogEmployee || false} fullWidth>
            <DialogContent>
                {employee.id ? (
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
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Фамилия"
                            value={dialogEmployee?.surname}
                            type="text"
                            variant="standard"
                            size="small"
                            onChange={handleSurname}
                            sx={{ width: 170 }}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Имя"
                            value={dialogEmployee?.name}
                            type="text"
                            variant="standard"
                            size="small"
                            onChange={handleName}
                            sx={{ width: 170 }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Отчество"
                            value={dialogEmployee?.patronymic}
                            type="text"
                            variant="standard"
                            size="small"
                            onChange={handlePatronymic}
                            sx={{ width: 170 }}
                        />
                    </Box>
                    <Box
                        mb={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Должность"
                            value={dialogEmployee?.position}
                            type="text"
                            variant="standard"
                            size="small"
                            onChange={handlePosition}
                            fullWidth
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            mt: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 150,
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    inputFormat="DD.MM.YYYY"
                                    value={timestampToNativeHTMLStringConverter(
                                        dialogEmployee?.birth
                                    )}
                                    onChange={handleBirthDate}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography>ГПХ</Typography>
                            <Checkbox
                                size="small"
                                checked={dialogEmployee.civilContract}
                                onChange={handleCivilContract}
                            />
                        </Box>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={dialogEmployee.sex}
                                onChange={handleSex}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirecton: "row",
                                    }}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Мужчина"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Женщина"
                                    />
                                </Box>
                            </RadioGroup>
                        </FormControl>
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
