import { Months } from "../../exports/utils";

export const months: string[] = [
    Months.jan,
    Months.feb,
    Months.march,
    Months.april,
    Months.may,
    Months.june,
    Months.july,
    Months.aug,
    Months.sep,
    Months.oct,
    Months.nov,
    Months.dec,
];

export const getPrevMonth = (currentMonth: string, months: string[]) => {
    if (currentMonth === Months.jan) return null;
    const index = months.findIndex((month) => month === currentMonth);
    return months[index - 1];
};
