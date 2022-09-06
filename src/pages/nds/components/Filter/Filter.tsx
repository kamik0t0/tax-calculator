import { InputLabel, TextField } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import { IInvoice } from "../../../../interfaces/IInvoice";
import FilterSelect from "./FilterSelect";
import { useFilter } from "./hooks/useFilter";
import { useInputDateValue } from "./hooks/useInputDateValue";
import { useSelectColumn } from "./hooks/useSelectColumn";
import { useSelectValue } from "./hooks/useSelectValue";
import { filterColumns, summColumns } from "./utils/columnsData";

type FilterTyped = {
    invoices: IInvoice[];
    setFiltered: Dispatch<SetStateAction<IInvoice[]>>;
};

const Filter: FC<FilterTyped> = ({ invoices, setFiltered }) => {
    // стейт раскрыть/закрыть колонок фильтрации
    const [handleSelectColumn, handleSelectSummCriterion] = useSelectColumn();
    // стейт значений фильтрации
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

    return (
        <>
            <InputLabel sx={{ color: "#2477CC" }}>Фильтр по:</InputLabel>
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
        </>
    );
};

export default Filter;
