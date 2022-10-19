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
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import {
    addEmployee,
    setEmployee,
    updateEmployee,
} from "@salarystore/salary-reducer";
import React, { FC, useEffect, useState } from "react";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import { IEmployee } from "../types/salary";
import { setDialogEmployee } from "@dialogstore/dialog-reducer";
import { timestampToNativeHTMLStringConverter } from "@helpers/dateHelpers";

// TODO: придумать как вызывать диалог с разными children
const FormDialog: FC = () => {
    const dispatch = useTypedDispatch();
    const { employee } = useTypedSelector((state) => state.salarySlice);
    const [dialogValues, setDialogValues] = useState(employee);
    const { dialogEmployee } = useTypedSelector((state) => state.dialogSlice);

    const handleClose = () => {
        if (dialogValues.id.length > 0) {
            dispatch(updateEmployee(dialogValues));
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "success",
                    message: "Данные сотрудника успешно обновлены!",
                })
            );
            dispatch(setDialogEmployee(false));
            dispatch(setEmployee(dialogValues));
        } else {
            if (
                dialogValues.name.length === 0 ||
                dialogValues.surname.length === 0
            )
                return dispatch(
                    showSuccessSnackBar({
                        open: true,
                        severity: "error",
                        message: "Заполните поля со звездочкой",
                    })
                );

            const employee = Object.assign({}, dialogValues, {
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
            dispatch(setDialogEmployee(false));
        }
    };

    const handleCencel = () => dispatch(setDialogEmployee(false));
    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDialogValues({ ...dialogValues, name: event.target.value });
    };
    const handleSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDialogValues({ ...dialogValues, surname: event.target.value });
    };
    const handlePatronymic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDialogValues({ ...dialogValues, patronymic: event.target.value });
    };
    const handlePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDialogValues({ ...dialogValues, position: event.target.value });
    };
    const handleBirthDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const HTMLDate = event.target.value;
        setDialogValues({
            ...dialogValues,
            birth: Date.parse(HTMLDate),
        });
    };
    const handleSex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDialogValues({ ...dialogValues, sex: event.target.value });
    };
    return (
        <Dialog open={dialogEmployee || false} fullWidth>
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
                            value={dialogValues?.surname}
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
                            value={dialogValues?.name}
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
                            value={dialogValues?.patronymic}
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
                            alignItems: "flex-end"
                        }}
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Должность"
                            value={dialogValues?.position}
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
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="date"
                            label="Дата рождения"
                            value={timestampToNativeHTMLStringConverter(
                                dialogValues?.birth
                            )}
                            variant="standard"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleBirthDate}
                            sx={{ width: 150 }}
                        />
                                                <Box                         
                            sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                            
                        }}>   
                            <Typography>ГПХ</Typography>                    
                            <Checkbox
                                size="small"
                                // checked={employeeSalary.checked}
                                // onChange={() =>
                                //     dispatch(setCheckBox(index, table))
                                // }
                            />
                        </Box>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={dialogValues.sex}
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
