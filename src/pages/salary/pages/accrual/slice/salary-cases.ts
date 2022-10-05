import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee, ISalaries, ISalary } from "../exports/interfaces";
import { newEmployee } from "../exports/utils";
import { calcPIT, calcTax } from "./scripts/calculateTaxes";
import { fillByPrevMonth } from "./scripts/fillByPrevMonth";

// Удаление начисления по сотруднику в конкретном месяце
export const deleteRowsReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    const table = action.payload;
    state.months[table].salary = state.months[table].salary.filter(
        (salary: ISalary) => !salary.checked
    );
};
// Загрузка начислений в конкретный месяц
export const updateSalariesReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<ISalary[], string, { table: string }>
    ) {
        const { table } = action.meta;
        state.months[table].salary = action.payload;
    },
    prepare(payload: ISalary[], table: string) {
        return { payload, meta: { table } };
    },
});
// Загрузка сотрудников из localStorage
export const setEmployeesReducer: CaseReducer<
    ISalaries,
    PayloadAction<IEmployee[]>
> = (state, action) => {
    state.employees = action.payload;
};
// Заполнить текущую таблицу на основе предыдущей
export const fillByPrevMonthReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    const table = action.payload;
    const filledMonth: ISalary[] = fillByPrevMonth(state, table);
    state.months[table].salary = filledMonth;
};
// TODO переписать на разные редюсеры (избавиться от switch)
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
            case "childrenQtty":
                state.months[table].salary[index].childrenQtty = +value;
                const {
                    PIT: PITwithRecoupment,
                    payment: paymentWithRecoupment,
                } = calcPIT(state, +value, table, index);

                state.months[table].salary[index].tax = +PITwithRecoupment;
                state.months[table].salary[index].pay = +paymentWithRecoupment;
                break;
            case "employee":
                const employee = state.employees.find(
                    (employee) => employee.id === value
                );
                if (employee) {
                    state.months[table].salary[
                        index
                    ].name = `${employee.surname} ${employee.name}`;

                    state.months[table].salary[index].employeeId = employee.id;
                }

                break;
            default:
                state.months[table].salary[index].accrued = +value;
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
// Изменение кода тарифа и пересчет страховых взносов
export const setSalaryTaxRateReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    const rateCode = action.payload;
    state.rateCode = rateCode;
    // Итерация по всем таблицам (месяцам)
    for (const table in state.months) {
        // массив зарплат в каждом месяце
        const salary: ISalary[] = state.months[table].salary;
        // итерация по сотрудникам в массиве зарплат в рамках одного месяца
        // пересчет взносов в месяце
        if (salary.length > 0) {
            salary.forEach((employee, index) => {
                const {
                    accident,
                    medical,
                    retirement,
                    social,
                    total,
                    overSocialLimit,
                    employeeCumulativeTotal,
                    overRetirmentLimit,
                    insuranceRetirementBase,
                    insuranceSocialBase,
                } = calcTax(
                    state,
                    employee.accrued,
                    table,
                    index,
                    state.rateCode
                );

                const { PIT, payment } = calcPIT(
                    state,
                    employee.childrenQtty,
                    table,
                    index
                );

                state.months[table].salary[index].tax = +PIT;
                state.months[table].salary[index].pay = +payment;

                state.months[table].salary[index].insurance.accident =
                    +accident;
                state.months[table].salary[index].insurance.medical = +medical;
                state.months[table].salary[index].insurance.retirement =
                    +retirement;
                state.months[table].salary[index].insurance.social = +social;
                state.months[table].salary[index].insuranceTotal = +total;
                state.months[table].salary[index].cumulativeAccrual =
                    employeeCumulativeTotal;
                state.months[table].salary[index].overSocialLimit =
                    overSocialLimit;
                state.months[table].salary[index].overRetirmentLimit =
                    overRetirmentLimit;
                state.months[table].salary[index].insuranceRetirementBase =
                    insuranceRetirementBase;
                state.months[table].salary[index].insuranceSocialBase =
                    insuranceSocialBase;
            });
        }
    }
};
// выбор (checkbox) сотрудника в таблице
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
// ГПХ / Трудовой
export const setCivilReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<number, string, { table: string }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state.months[table].salary[index].civilContract =
            !state.months[table].salary[index].civilContract;
    },
    prepare(payload: number, table: string) {
        return { payload, meta: { table } };
    },
});

// Добавление сотрудника в таблицу
export const addRowReducer = () => {
    return {
        reducer(
            state: ISalaries,
            action: PayloadAction<ISalary, string, { table: string }>
        ) {
            const { table } = action.meta;
            state.months[table].salary.push(action.payload);
        },
        prepare(payload: ISalary, table: string) {
            return { payload, meta: { table } };
        },
    };
};
// удалить сотрудника из таблицы
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

// Добавление сотрудника в базу
export const addEmployeeReducer: CaseReducer<
    ISalaries,
    PayloadAction<IEmployee>
> = (state, action) => {
    state.employees.push(action.payload);
};
// Добавление сотрудника в базу
export const deleteEmployeeReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    const id = action.payload;
    state.employees = state.employees.filter((employee) => employee.id !== id);
};
// Установка сотрудника
export const setEmployeeReducer: CaseReducer<
    ISalaries,
    PayloadAction<IEmployee>
> = (state, action) => {
    state.employee = action.payload;
};
export const setEmployeeByIdReducer: CaseReducer<
    ISalaries,
    PayloadAction<string>
> = (state, action) => {
    const employee = state.employees.find(
        (employee) => employee.id === action.payload
    );
    if (employee) {
        state.employee = employee;
    } else {
        state.employee = newEmployee;
    }
};
// удалить сотрудника из таблицы
export const updateEmployeeReducer: CaseReducer<
    ISalaries,
    PayloadAction<IEmployee>
> = (state, action) => {
    const employee = action.payload;
    const index = state.employees.findIndex((item) => item.id === employee.id);
    state.employees[index] = employee;
};
// районный коэффициент
export const setSalaryDistrictCoeffReducer: CaseReducer<
    ISalaries,
    PayloadAction<number>
> = (state, action) => {
    const districtCoeff = action.payload;
    state.districtCoeff = districtCoeff;
};
// МРОТ
export const setMinimalSalaryReducer: CaseReducer<
    ISalaries,
    PayloadAction<number>
> = (state, action) => {
    const minimalSalary = action.payload;
    state.minimalSalary = minimalSalary;
};
