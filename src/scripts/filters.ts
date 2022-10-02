import { ChangeEvent } from "react";
import { IPropSignature } from "../types/propSignature";

// TODO: refactor - отвязать функции фильтрации по сумме от конкретных значений свойств. Свойства должны приходить параметрами

export const filterByString = <T extends IPropSignature>(
    event: ChangeEvent<HTMLInputElement>,
    items: T[],
    field: string
): T[] => {
    const inputValue = event.target.value.toString().toLowerCase();
    let regexp = new RegExp(inputValue, "g");
    return items.filter(
        (item: T) => item[field].toString().toLowerCase().search(regexp) !== -1
    );
};

export const filterByDate = <T extends { date: number }>(
    items: T[],
    dateStart: number,
    dateEnd: number
) => {
    return [...items].filter((item) => {
        const invoiceDate = item.date;
        return invoiceDate >= dateStart && invoiceDate <= dateEnd;
    });
};

export const filterBySumm = <T extends IPropSignature>(
    event: ChangeEvent<HTMLInputElement>,
    items: T[],
    summCriterion: string
): T[] => {
    const userSumm = +event.target.value;
    if (userSumm === 0) {
        return items;
    } else {
        switch (summCriterion) {
            case "more":
                return items.filter((item: T) => +item.summ > userSumm);
            case "less":
                return items.filter((item: T) => +item.summ < userSumm);
            case "equal":
                return items.filter((item: T) => +item.summ === userSumm);
            default:
                return items.filter((item: T) => item.summ === userSumm);
        }
    }
};
