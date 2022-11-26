import {
    MinimalSalary01012022,
    MinimalSalary01062022,
    Months,
} from "../exports/utils";

export const getMinimalSalary = (month: string) => {
    if (
        month === Months.jan ||
        month === Months.feb ||
        month === Months.march ||
        month === Months.april ||
        month === Months.may
    )
        return MinimalSalary01012022;
    else return MinimalSalary01062022;
};
