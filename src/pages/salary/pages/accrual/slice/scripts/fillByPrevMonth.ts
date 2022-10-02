import { nanoid } from "@reduxjs/toolkit";
import { ISalaries, ISalary } from "../../exports/interfaces";
import { months } from "../../exports/utils";
import { getPrevMonth } from "./getPrevMonth";

export const fillByPrevMonth = (state: ISalaries, month: string) => {
    const prevMonth = getPrevMonth(month, months)!;
    const currentMonthSalary: ISalary[] = [];

    state.months[prevMonth].salary.forEach((accrual: ISalary) => {
        currentMonthSalary.push(
            Object.assign({}, accrual, {
                id: nanoid(6),
            })
        );
    });
    return currentMonthSalary;
};
