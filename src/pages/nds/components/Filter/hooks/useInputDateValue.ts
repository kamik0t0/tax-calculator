import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
    isInteravalCorrect,
    timestampToNativeHTMLStringConverter,
} from "../../../../../helpers/dateHelpers";
import { IInvoice } from "../../../../../interfaces/IInvoice";
import { filterByDate } from "../../../../../scripts/filters";

const currentDate = Date.now();

export const useInputDateValue = (
    invoices: IInvoice[],
    setFiltered: Dispatch<SetStateAction<IInvoice[]>>
) => {
    // стейт для начальной даты
    const [dateStart, setDateStart] = useState<number>(currentDate);
    // стейт для конечной даты
    const [dateEnd, setDateEnd] = useState<number>(currentDate);
    // стейт ошибки (в случае если начальная дата больше конечной)
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    // обработчик начальной даты
    const startDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = Date.parse(event.target.value);
        const isCorrectDate = isInteravalCorrect(date, dateEnd);
        setIsCorrect(isCorrectDate);
        if (isCorrectDate) setFiltered(filterByDate(invoices, date, dateEnd));
        setDateStart(date);
    };
    // обработчик конечной даты
    const endDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = Date.parse(event.target.value);
        const isCorrectDate = isInteravalCorrect(dateStart, date);
        setIsCorrect(isCorrectDate);
        if (isCorrectDate) setFiltered(filterByDate(invoices, dateStart, date));
        setDateEnd(date);
    };
    // конвертация значения для отображения внутре TextField
    const startDateDisplay = useMemo(
        () => timestampToNativeHTMLStringConverter(dateStart),
        [dateStart]
    );
    const endDateDisplay = useMemo(
        () => timestampToNativeHTMLStringConverter(dateEnd),
        [dateEnd]
    );

    return [
        isCorrect,
        startDateHandler,
        endDateHandler,
        startDateDisplay,
        endDateDisplay,
    ] as const;
};
