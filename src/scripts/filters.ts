import { IPropSignature } from "../types/propSignature";

export const filterByString = <T extends IPropSignature>(
    value: string,
    items: T[],
    field: string
): T[] => {
    let regexp = new RegExp(value, "g");
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
    summ: number,
    items: T[],
    summCriterion: string
): T[] => {
    if (summ === 0) {
        return items;
    } else {
        switch (summCriterion) {
            case "more":
                return items.filter((item: T) => +item.summ > summ);
            case "less":
                return items.filter((item: T) => +item.summ < summ);
            case "equal":
                return items.filter((item: T) => +item.summ === summ);
            default:
                summ;
                return items.filter((item: T) => item.summ === summ);
        }
    }
};
