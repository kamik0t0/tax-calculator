import { useToggle } from "@customhooks/useToggle";
import { useValue } from "@customhooks/useValue";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { filterByString, filterBySumm } from "@scripts/filters";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { FilterDate, FilterSelect } from "../exports/components";
import { useFilterCriterion } from "../exports/hooks";
import { IInvoice } from "../exports/interfaces";
import { filterColumns, summColumns } from "../exports/utils";

type FilterTyped = {
    invoices: IInvoice[];
    setFiltered: Dispatch<SetStateAction<IInvoice[]>>;
};
const Filter: FC<FilterTyped> = ({ invoices, setFiltered }) => {
    const dispatch = useTypedDispatch();
    // стейт выбора колонки фильтрации
    const [, handleSelectColumn] = useToggle(false);
    // стейт выбора критерия фильтрации
    const [, handleSelectSummCriterion] = useToggle(false);
    // критерий фильтра по сумме
    const [summCriterion, handleChangeCriterion] = useValue("more");
    // хук значений фильтрации
    const [column, handleChangeColumn, inputType] = useFilterCriterion();

    const filterNumHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const summ = +event.target.value;
        setFiltered(filterBySumm(summ, invoices, summCriterion as string));
    };

    const filterStrHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setFiltered(filterByString(value, invoices, column));
    };

    // выбор фильтра в зависимости от типа вводимых значений
    const filter = inputType === "string" ? filterStrHandler : filterNumHandler;

    // сброс фильтра
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
                    <FilterDate invoices={invoices} setFiltered={setFiltered} />
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
