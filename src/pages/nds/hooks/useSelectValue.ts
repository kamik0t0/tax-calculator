import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useValue } from "@customhooks/useValue";

export const useSelectValue = (): {
    column: string;
    summCriterion: typeof summCriterion;
    handleChangeColumn: (
        event:
            | ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
              >
            | SelectChangeEvent<string | number>
    ) => void;
    handleChangeCriterion: (
        event:
            | ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
              >
            | SelectChangeEvent<string | number>
    ) => void;
    inputType: string;
} => {
    const [summCriterion, handleChangeCriterion] = useValue("more");
    const [column, setColumn] = useState<string>("client");
    const [inputType, setInputType] = useState<string>("string");
    // изменить стейт колонки фильтрации
    function handleChangeColumn<
        T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(event: ChangeEvent<T> | SelectChangeEvent<string | number>) {
        const choosenColumn = event.target.value;
        setColumn(choosenColumn as string);
        if (choosenColumn === "summ") setInputType("number");
        if (choosenColumn === "date") setInputType("date");
        if (choosenColumn === "client") setInputType("string");
    }

    return {
        column,
        summCriterion,
        handleChangeColumn,
        handleChangeCriterion,
        inputType,
    } as const;
};
