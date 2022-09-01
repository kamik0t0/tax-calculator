import {
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import React, {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { useFilter } from "../hooks/useFilter";
import { IInvoice } from "../interfaces/IInvoice";

type FilterTyped = {
    invoices: IInvoice[];
    setFiltered: Dispatch<SetStateAction<IInvoice[]>>;
};

const Filter: FC<FilterTyped> = ({ invoices, setFiltered }) => {
    const { column, setColumn, summCriterion, setSummCriterion, filterList } =
        useFilter(invoices, setFiltered);
    const [selectColumn, setSelectColumn] = useState<boolean>(false);
    const [selectSummCriterion, setSelectSummCriterion] =
        useState<boolean>(false);
    const [inputType, setInputType] = useState("string");
    // изменить стейт колонки фильтрации
    const handleChangeColumn = (event: SelectChangeEvent<typeof column>) =>
        setColumn(event.target.value);
    // изменить стейт колонки фильтрации
    const handleChangeCriterion = (event: SelectChangeEvent<typeof column>) =>
        setSummCriterion(event.target.value);
    // раскарыть/закрыть фильтр колонок
    const handleSelectColumn = () => setSelectColumn(!selectColumn);
    // раскарыть/закрыть фильтр суммы
    const handleSelectSummCriterion = () =>
        setSelectSummCriterion(!selectSummCriterion);
    // Переключение типа поля фильтрации - текстовое или цифровое
    useEffect(() => {
        if (column === "summ") setInputType("number");
        else setInputType("string");
    }, [column]);

    return (
        <>
            <InputLabel
                sx={{ color: "#2477CC" }}
                id="demo-controlled-open-select-label"
            >
                Поиск по:
            </InputLabel>
            <Select
                size="small"
                labelId="label-column-search-select"
                id="column-search-select"
                onClick={handleSelectColumn}
                value={column}
                onChange={handleChangeColumn}
                sx={{ width: 150, ml: 2 }}
            >
                <MenuItem value="date">Дате</MenuItem>
                <MenuItem value="client">Контрагенту</MenuItem>
                <MenuItem value="summ">Сумме</MenuItem>
            </Select>
            {column === "summ" && (
                <Select
                    size="small"
                    labelId="label-column-search-select-summ"
                    id="column-search-select-summ"
                    onClick={handleSelectSummCriterion}
                    value={summCriterion}
                    onChange={handleChangeCriterion}
                    sx={{ width: 150, ml: 2 }}
                >
                    <MenuItem value="more">Больше</MenuItem>
                    <MenuItem value="less">Меньше</MenuItem>
                    <MenuItem value="equal">Равно</MenuItem>
                </Select>
            )}
            <TextField
                size="small"
                sx={{ ml: 3 }}
                id="standard-basic"
                label="Поиск"
                variant="standard"
                onChange={filterList}
                type={inputType}
            />
        </>
    );
};

export default Filter;
