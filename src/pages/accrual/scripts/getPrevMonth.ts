import { Months } from "../exports/utils";

export const getPrevMonth = (currentMonth: string, months: string[]) => {
    if (currentMonth === Months.jan) return null;
    const index = months.findIndex((month) => month === currentMonth);
    return months[index - 1];
};
