import { Box } from "@mui/material";
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
import { useTypedDispatch } from "@reduxhooks/hooks";
import { nanoid } from "@reduxjs/toolkit";
import {
    addEmployee,
    updateEmployee,
    updateSalary,
} from "@salarystore/salary-reducer";
import React, { FC, useEffect, useState } from "react";
import { newEmployee } from "../exports/utils";
import { IEmployee } from "../types/salary";

const FormDialog: FC<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentEmployee: IEmployee | undefined;
    table: string;
    index: number;
    prop: string;
}> = ({ open, setOpen, currentEmployee, table, index, prop }) => {
    const dispatch = useTypedDispatch();
    const [dialogValues, setDialogValues] = useState(newEmployee);

    const handleClose = () => {
        if (dialogValues.id.length > 0) {
            dispatch(updateEmployee(dialogValues));
            dispatch(
                updateSalary(dialogValues.id, table, index.toString(), prop)
            );
            setOpen(false);
        } else {
            if (
                dialogValues.name.length === 0 ||
                dialogValues.surname.length === 0
            )
                return alert("Введите имя и фамилию");

            const employee = Object.assign({}, dialogValues, {
                id: nanoid(6),
            });

            dispatch(addEmployee(employee as unknown as IEmployee));
            setOpen(false);
        }
    };

    const handleCencel = () => setOpen(false);
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
        setDialogValues({
            ...dialogValues,
            birth: event.target.value,
        });
    };
    const handleSex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDialogValues({ ...dialogValues, sex: event.target.value });
    };

    useEffect(() => {
        if (currentEmployee) setDialogValues(currentEmployee);
    }, [currentEmployee]);

    return (
        <Dialog open={open} onClose={setOpen} fullWidth>
            <DialogContent>
                <DialogContentText>Новый сотрудник:</DialogContentText>
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
                            value={dialogValues?.birth}
                            variant="standard"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleBirthDate}
                            sx={{ width: 150 }}
                        />
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
