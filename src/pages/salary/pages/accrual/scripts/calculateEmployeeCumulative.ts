import { ISalaries, ISalary } from "../exports/interfaces";
import { months } from "../exports/utils";

export function calcEmployeeCumulative(
    table: string,
    state: ISalaries,
    employeeId: string,
    value: number
) {
    const monthNumber = months.findIndex((month) => month === table);
    // вычисляем начисления ЗП нарастающим итогом по сотруднику за предыдущие периоды
    const employeeAccrualsPerYear: ISalary[] = makeEmployeeSalaryArr(
        state,
        employeeId,
        monthNumber
    );

    const employeeCumulativePerYear: number = calcEmployeeCumulativePerYear(
        employeeAccrualsPerYear
    );
    const currentCumulativeAccrual = employeeCumulativePerYear + value;
    return { employeeCumulativePerYear, currentCumulativeAccrual };
}

export function calcEmployeeCumulativePerYear(
    employeeAccrualsPerYear: ISalary[]
) {
    return employeeAccrualsPerYear.reduce(
        (accrualSumm, current) => accrualSumm + current.accrued,
        0
    );
}

export function makeEmployeeSalaryArr(
    state: ISalaries,
    employeeId: string,
    monthNumber: number
) {
    const employeeAccrualsPerYear: ISalary[] = [];
    let monthCounter = 0;
    for (const month in state.months) {
        // 2) по id сотрудника выбрать начисления в предшествующих месяцах...
        if (employeeId) {
            const employeeAccrual: ISalary = state.months[month].salary.find(
                (accrual: ISalary) => accrual.employeeId === employeeId
            );
            if (monthCounter === monthNumber) break;
            // ... если не undefined
            employeeAccrual && employeeAccrualsPerYear.push(employeeAccrual);
        }
        monthCounter++;
    }
    return employeeAccrualsPerYear;
}
