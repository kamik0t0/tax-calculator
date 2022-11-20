import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";

export const useFilterCriterion = () => {
    const [column, setColumn] = useState<string>("client");
    const [inputType, setInputType] = useState<string>("string");

    // в зависимости от типа фильтрации меняется тип ввода и интерфейс
    function handleChangeColumn<
        T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(event: ChangeEvent<T> | SelectChangeEvent<string | number>) {
        const choosenColumn = event.target.value;
        setColumn(choosenColumn as string);
        if (choosenColumn === "summ") setInputType("number");
        if (choosenColumn === "date") setInputType("date");
        if (choosenColumn === "client") setInputType("string");
    }

    return [column, handleChangeColumn, inputType] as const;
};
