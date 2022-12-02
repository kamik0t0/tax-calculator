import { IEmployee, ISalary } from "../exports/interfaces";

/**
 * @function salaryEmployeeDelete
 * @description delete employee and all related data
 * @param {IEmployee[]} employees employees array
 * @param {ISalary[]} salary salary array
 * @returns {ISalary[] | null} ISalary[] | null
 */
export const salaryEmployeeDelete = (
    employees: Pick<IEmployee, "id">[],
    salary: Partial<Pick<ISalary, "employeeId" | "id">[]>
) => {
    const leftSalaries: ISalary[] = [];
    const mapped1: string[] = [...employees].map((elem) => elem.id);
    const mapped2: (string | undefined)[] = [...salary].map((elem) => elem?.id);

    if (salary.length > 0) {
        mapped2.forEach((id) => {
            const existedAccrual = salary.find((accrual) => accrual?.id === id);
            // если добавлена строка без сотрудника
            if (existedAccrual?.employeeId === "")
                leftSalaries.push(existedAccrual as ISalary);
            // если работник в начислении имеет id из employees
            if (
                existedAccrual?.employeeId &&
                mapped1.includes(existedAccrual?.employeeId)
            )
                leftSalaries.push(existedAccrual as ISalary);
        });
        return leftSalaries;
    } else return null;
};
