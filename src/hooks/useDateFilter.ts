import { Dispatch, SetStateAction, useState } from "react";
import { Dayjs } from "dayjs";
import { isDateInteravalCorrect } from "@helpers/dateHelpers";
import { filterByDate } from "@scripts/filters";

const currentDate = Date.now();

export const useDateFilter = <T extends { date: number }>(
    items: T[],
    setItems: Dispatch<SetStateAction<T[]>>
) => {
    // стейт для начальной даты
    const [start, setDateStart] = useState<number>(currentDate);
    // стейт для конечной даты
    const [end, setDateEnd] = useState<number>(currentDate);
    // стейт ошибки (в случае если начальная дата больше конечной)
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    const dateHandler = (
        date: Dayjs | null,
        action: Dispatch<SetStateAction<number>>,
        filter: (date: number) => T[]
    ) => {
        const parsedDate = date && Date.parse(date.format());
        if (parsedDate) {
            setItems(filter(parsedDate));
            action(parsedDate);
        }
    };
    const getEndDate = (date: Dayjs | null) => {
        dateHandler(date, setDateEnd, (date) => {
            const isDateCorrect = isDateInteravalCorrect(start, date);
            setIsCorrect(isDateCorrect);
            return isDateCorrect ? filterByDate(items, start, date) : items;
        });
    };
    const getStartDate = (date: Dayjs | null) => {
        dateHandler(date, setDateStart, (date) => {
            const isDateCorrect = isDateInteravalCorrect(date, end);
            setIsCorrect(isDateCorrect);
            return isDateCorrect ? filterByDate(items, date, end) : items;
        });
    };

    return [isCorrect, getStartDate, getEndDate, start, end] as const;
};
