import { CaseReducer, current, PayloadAction } from "@reduxjs/toolkit";
import {
    ISalaries,
    ISalary,
} from "../../../pages/salary-tax/interfaces/ISalary";
import { calcGlobalTax, calcPIT, calcTax } from "./scripts/calculateTaxes";
import { months, getPrevMonth } from "./scripts/getPrevMonth";

export const deleteRowsReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    const table = action.payload;
    state.months[table].salary = state.months[table].salary.filter(
        (salary: ISalary) => !salary.checked
    );
};

export const updateSalariesReducer = <T>() => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<T[], string, { table: string }>
    ) {
        const { table } = action.meta;
        state.months[table].salary = action.payload;
    },
    prepare(payload: T[], table: string) {
        return { payload, meta: { table } };
    },
});

export const fillByPrevMonthReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    const table = action.payload;
    const prevMonth = getPrevMonth(table, months);
    if (prevMonth) {
        if (state.months[prevMonth].salary.length === 0)
            return alert("В предыдущем месяце нет данных");
        state.months[table].salary = state.months[prevMonth].salary;
        state.months[table].summary = state.months[prevMonth].summary;
    }
};

export const updateSalaryReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<
            string | number,
            string,
            { table: string; index: string; prop: string }
        >
    ) {
        const value = action.payload;
        const index = +action.meta.index;
        const { table, prop } = action.meta;

        switch (prop) {
            case "employee":
                state.months[table].salary[index][prop] = value;
                break;
            case "childrenQtty":
                // функция по пересчету НДФЛ
                calcPIT(state, +value, table, index);
                break;
            default:
                calcTax(state, +value, table, index, state.rateCode);
                break;
        }
    },
    prepare(
        payload: string | number,
        table: string,
        index: string,
        prop: string
    ) {
        return { payload, meta: { table, index, prop } };
    },
});

export const setSalaryTaxRateReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    state.rateCode = action.payload;
    calcGlobalTax(state, action.payload);
};

export const setCheckBoxReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<number, string, { table: string }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state.months[table].salary[index].checked =
            !state.months[table].salary[index].checked;
    },
    prepare(payload: number, table: string) {
        return { payload, meta: { table } };
    },
});

export const addRowReducer = () => {
    return {
        reducer(
            state: ISalaries,
            action: PayloadAction<object, string, { table: string }>
        ) {
            const { table } = action.meta;
            state.months[table].salary.push(action.payload);
        },
        prepare(payload: ISalary, table: string) {
            return { payload, meta: { table } };
        },
    };
};

export const deleteRowReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<number, string, { table: string }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state.months[table].salary = state.months[table].salary.filter(
            (_: never, i: number) => i !== index
        );
    },
    prepare(payload: number, table: string) {
        return { payload, meta: { table } };
    },
});
