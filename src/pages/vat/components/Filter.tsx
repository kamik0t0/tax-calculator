import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import { FilterSelect } from "../exports/components";
import {
    useFilter,
    useInputDateValue,
    useSelectColumn,
    useSelectValue,
} from "../exports/hooks";
import { IInvoice } from "../exports/interfaces";
import { filterColumns, summColumns } from "../exports/utils";
import { useTypedDispatch } from "@reduxhooks/hooks";

type FilterTyped = {
    invoices: IInvoice[];
    setFiltered: Dispatch<SetStateAction<IInvoice[]>>;
};

const Filter: FC<FilterTyped> = ({ invoices, setFiltered }) => {
    const dispatch = useTypedDispatch();
    // хук "раскрыть/закрыть" колонки фильтрации
    const [handleSelectColumn, handleSelectSummCriterion] = useSelectColumn();
    // хук значений фильтрации
    const {
        column,
        summCriterion,
        handleChangeColumn,
        handleChangeCriterion,
        inputType,
    } = useSelectValue();
    // хук фильтрации
    const filter = useFilter(
        invoices,
        setFiltered,
        summCriterion as string,
        column
    );
    // хук по работе с датой
    const [
        isCorrect,
        startDateHandler,
        endDateHandler,
        startDateDisplay,
        endDateDisplay,
    ] = useInputDateValue(invoices, setFiltered);

    const reset = () => {
        dispatch(
            showSuccessSnackBar({
                open: true,
                severity: "info",
                message: "Результат фильтрации сброшен!",
            })
        );
        setFiltered(invoices);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 30,
                    mb: 3,
                }}
            >
                <InputLabel sx={{ color: "#2477CC" }}>
                    <Typography>Фильтр по:</Typography>
                </InputLabel>
                <FilterSelect
                    onClick={handleSelectColumn}
                    onChange={handleChangeColumn}
                    value={column}
                    items={filterColumns}
                />
                {column === "summ" && (
                    <FilterSelect
                        onClick={handleSelectSummCriterion}
                        onChange={handleChangeCriterion}
                        value={summCriterion as string}
                        items={summColumns}
                    />
                )}
                {column === "date" ? (
                    <>
                        <InputLabel
                            sx={{
                                ml: 2,
                                color: "#2477CC",
                            }}
                        >
                            c:
                        </InputLabel>
                        <TextField
                            error={!isCorrect}
                            size="small"
                            sx={{ ml: 3 }}
                            variant="standard"
                            value={startDateDisplay}
                            onChange={startDateHandler}
                            type="date"
                        />
                        <InputLabel
                            sx={{
                                ml: 2,
                                color: "#2477CC",
                            }}
                        >
                            по:
                        </InputLabel>
                        <TextField
                            size="small"
                            sx={{ ml: 3 }}
                            variant="standard"
                            value={endDateDisplay}
                            onChange={endDateHandler}
                            type="date"
                        />
                    </>
                ) : (
                    <TextField
                        size="small"
                        sx={{ ml: 3 }}
                        label="Фильтр"
                        variant="standard"
                        onChange={filter}
                        type={inputType}
                    />
                )}
                <Button variant="outlined" sx={{ ml: 3 }} onClick={reset}>
                    Сброс
                </Button>
            </Box>
        </>
    );
};

export default Filter;
