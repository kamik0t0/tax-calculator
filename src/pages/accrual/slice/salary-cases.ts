import { CaseReducer, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { calcSalaryTaxes } from "../classes/calcSalaryTax";
import { IEmployee, ISalaries, ISalary } from "../exports/interfaces";
import { fillByPrevMonth } from "../exports/scripts";
import { Months, rates } from "../exports/utils";

// Добавление сотрудника в таблицу
export const addRowReducer = () => {
    return {
        reducer(
            state: ISalaries,
            action: PayloadAction<ISalary, string, { table: Months }>
        ) {
            const { table } = action.meta;
            const { payload: accrual } = action;
            state.months[table].salary.push(accrual);
        },
        prepare(payload: ISalary, table: Months) {
            return { payload, meta: { table } };
        },
    };
};

// удалить сотрудника из таблицы
export const deleteRowReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<number, string, { table: Months }>
    ) {
        const { payload: index } = action;
        const { table } = action.meta;
        state.months[table].salary = state.months[table].salary.filter(
            (_, i) => i !== index
        );
    },
    prepare(payload: number, table: Months) {
        return { payload, meta: { table } };
    },
});

// Удаление начисления по сотруднику в конкретном месяце
export const deleteRowsReducer: CaseReducer<ISalaries, PayloadAction<Months>> =
    (state, action) => {
        const { payload: month } = action;
        state.months[month].salary = state.months[month].salary.filter(
            (salary: ISalary) => !salary.checked
        );
    };

// Загрузка начислений в конкретный месяц
export const updateSalariesReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<ISalary[], string, { table: Months }>
    ) {
        const { table } = action.meta;
        const { payload: monthSalary } = action;
        state.months[table].salary = monthSalary;
    },
    prepare(payload: ISalary[], table: string) {
        return { payload, meta: { table } };
    },
});
export const updateEmployeesInSalariesReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<EntityId[], string, { employees: IEmployee[] }>
    ) {
        const { payload: employeesIds } = action;
        const { employees } = action.meta;
        for (const month in state.months) {
            state.months[month].salary.forEach((data, index) => {
                if (employeesIds.includes(data.employeeId)) {
                    const employee = employees.find(
                        (emp) => emp.id === data.employeeId
                    );
                    if (employee) {
                        const name = `${employee.surname} ${employee.name}`;
                        state.months[month].salary[index].name = name;
                    }
                }
            });
        }
    },
    prepare(payload: EntityId[], employees: IEmployee[]) {
        return { payload, meta: { employees } };
    },
});

// TODO переписать на разные редюсеры (избавиться от switch)
export const updateSalaryReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<
            string | number,
            string,
            { table: Months; index: string; prop: string }
        >
    ) {
        const value = action.payload;
        const index = +action.meta.index;
        const { table, prop } = action.meta;

        switch (prop) {
            case "childrenQtty":
                const getPIT = calcSalaryTaxes.calcPIT;
                const salary = state.months[table].salary[index].accrued;
                const { PIT, payment } = getPIT(salary, +value);

                state.months[table].salary[index].childrenQtty = +value;
                state.months[table].salary[index].tax = +PIT;
                state.months[table].salary[index].pay = +payment;
                break;
            default:
                state.months[table].salary[index].accrued = +value;
                break;
        }
    },
    prepare(
        payload: string | number,
        table: Months,
        index: string,
        prop: string
    ) {
        return { payload, meta: { table, index, prop } };
    },
});
//
export const setEmployeeToSalaryAccrualReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<
            IEmployee,
            string,
            { table: Months; index: number }
        >
    ) {
        const { payload: employee } = action;
        const { index } = action.meta;
        const { table } = action.meta;
        const { id } = employee;

        const name = `${employee.surname} ${employee.name}`;
        state.months[table].salary[index].name = name;
        state.months[table].salary[index].employeeId = id;
    },
    prepare(payload: IEmployee, table: Months, index: number) {
        return { payload, meta: { table, index } };
    },
});

// Изменение кода тарифа и пересчет страховых взносов
export const setSalaryTaxRateReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<rates, string, { employees: IEmployee[] }>
    ) {
        const { payload: rateCode } = action;
        const { employees } = action.meta;

        state.rateCode = rateCode;
        const taxCalculations = new calcSalaryTaxes(
            state.months,
            rateCode,
            employees
        );
        taxCalculations.recalcYearSalary(state.months);
    },
    prepare(payload: rates, employees: IEmployee[]) {
        return { payload, meta: { employees } };
    },
});

// выбор (checkbox) сотрудника в таблице
export const setCheckBoxReducer = () => ({
    reducer(
        state: ISalaries,
        action: PayloadAction<number, string, { table: Months }>
    ) {
        const index = action.payload;
        const { table } = action.meta;
        state.months[table].salary[index].checked =
            !state.months[table].salary[index].checked;
    },
    prepare(payload: number, table: Months) {
        return { payload, meta: { table } };
    },
});

// Заполнить текущую таблицу на основе предыдущей
export const fillByPrevMonthReducer: CaseReducer<
    ISalaries,
    PayloadAction<Months>
> = (state, action) => {
    const { payload: table } = action;
    const filledMonth: ISalary[] = fillByPrevMonth(state.months, table);
    state.months[table].salary = filledMonth;
};

// районный коэффициент
export const setSalaryDistrictCoeffReducer: CaseReducer<
    ISalaries,
    PayloadAction<number>
> = (state, action) => {
    const { payload: districtCoeff } = action;
    state.districtCoeff = districtCoeff;
};
// МРОТ
export const setMinimalSalaryReducer: CaseReducer<
    ISalaries,
    PayloadAction<number>
> = (state, action) => {
    const { payload: minimalSalary } = action;
    state.minimalSalary = minimalSalary;
};
