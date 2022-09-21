import { nanoid } from "@reduxjs/toolkit";
import { ISalaries, ISalary } from "../../exports/interfaces";
import { Months, months } from "../../exports/utils";
import { calcBasicTax, calcBusinessTax, calcITtax } from "./calculateTaxes";

const getPrevMonth = (currentMonth: string, months: string[]) => {
    if (currentMonth === Months.jan) return null;
    const index = months.findIndex((month) => month === currentMonth);
    return months[index - 1];
};

export const fillByPrevMonth = (state: ISalaries, month: string) => {
    const prevMonth = getPrevMonth(month, months);

    if (prevMonth) {
        if (state.months[prevMonth].salary.length === 0) {
            alert("В предыдущем месяце нет данных");
            return state.months[month].salary as ISalary[];
        }
        const currentMonthSalary: ISalary[] = [];
        const prevMonthSalary: ISalary[] = state.months[prevMonth].salary;

        prevMonthSalary.forEach((prevMonthEmployee, i) => {
            let insurance;
            switch (state.rateCode) {
                case "06":
                    insurance = calcITtax(
                        state,
                        prevMonthEmployee.accrued,
                        month,
                        i
                    );
                    break;
                case "20":
                    insurance = calcBusinessTax(
                        state,
                        prevMonthEmployee.accrued,
                        month,
                        i
                    );
                    break;
                default:
                    insurance = calcBasicTax(
                        state,
                        prevMonthEmployee.accrued,
                        month,
                        i
                    );
                    break;
            }
            currentMonthSalary.push(
                Object.assign({}, prevMonthEmployee, {
                    id: nanoid(6),
                    insurance: {
                        retirement: insurance?.retirement,
                        accident: insurance?.accident,
                        medical: insurance?.medical,
                        social: insurance?.social,
                    },
                    insuranceTotal: insurance?.total,
                })
            );
        });

        return currentMonthSalary;
    } else {
        return state.months[month].salary as ISalary[];
    }
};
