import { nanoid } from "@reduxjs/toolkit";
import { IMonths, ISalary } from "../exports/interfaces";
import { months } from "../exports/utils";
import { getPrevMonth } from "../exports/scripts";

/**
 * @function fillByPrevMonth
 * @description fills current month will previouse month data
 * @param {IMonths} stateMonths
 * @param {string} month month name
 * @returns {ISalary[]} ISalary[] current month
 */

export const fillByPrevMonth = (
    stateMonths: IMonths,
    month: string
): ISalary[] => {
    const prevMonth = getPrevMonth(month, months)!;
    const currentMonthSalary: ISalary[] = [];

    stateMonths[prevMonth].salary.forEach((accrual: ISalary) => {
        currentMonthSalary.push(
            Object.assign({}, accrual, {
                id: nanoid(6),
            })
        );
    });
    return currentMonthSalary;
};
