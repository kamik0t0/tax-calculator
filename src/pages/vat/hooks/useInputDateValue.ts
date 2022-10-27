import {
    isInteravalCorrect,
    timestampToNativeHTMLStringConverter,
} from "@helpers/dateHelpers";
import { filterByDate } from "@scripts/filters";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IInvoice } from "../exports/interfaces";
import { Dayjs } from "dayjs";

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
    const startDateHandler = (date: Dayjs | null) => {
        const parsedDate = date && Date.parse(date.format());

        if (parsedDate) {
            const isDateCorrect = isInteravalCorrect(parsedDate, dateEnd);
            setIsCorrect(isDateCorrect);
            if (isDateCorrect)
                setFiltered(filterByDate(invoices, parsedDate, dateEnd));
            setDateStart(parsedDate);
        }
    };
    // обработчик конечной даты
    const endDateHandler = (date: Dayjs | null) => {
        const parsedDate = date && Date.parse(date.format());

        if (parsedDate) {
            const isDateCorrect = isInteravalCorrect(dateStart, parsedDate);
            setIsCorrect(isDateCorrect);

            if (isDateCorrect)
                setFiltered(filterByDate(invoices, dateStart, parsedDate));
            setDateEnd(parsedDate);
        }
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
