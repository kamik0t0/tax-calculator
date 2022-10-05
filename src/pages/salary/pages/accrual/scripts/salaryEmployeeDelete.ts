import { IEmployee, ISalary } from "../types/salary";

// В случае изменения данных сотрудника в стейте employees функция ищет такого сотрудника в таблицах начислений и, если находит, вносит соответствующие обновления
export const salaryEmployeeDelete = (
    employees: IEmployee[],
    salary: ISalary[]
) => {
    const leftSalaries: ISalary[] = [];
    const mapped1: string[] = [...employees].map((elem) => elem.id);
    const mapped2: string[] = [...salary].map((elem) => elem.id);
    // salary.length = 0 - при первом запуске приложения либо при обновлении, т.е. в данном случае все данные в таблице начислений (если например стартануть не с неё) просто сотрутся
    if (salary.length > 0) {
        mapped2.forEach((id) => {
            const existedAccrual = salary.find(
                (accrual: ISalary) => accrual.id === id
            );
            // если добавлена строка без сотрудника
            if (existedAccrual?.employeeId === "")
                leftSalaries.push(existedAccrual);
            // если работник в начислении имеет id из employees
            if (
                existedAccrual?.employeeId &&
                mapped1.includes(existedAccrual?.employeeId)
            )
                leftSalaries.push(existedAccrual);
        });
        return leftSalaries;
    } else return null;
};
