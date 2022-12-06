import { employeeType, IEmployee, ISalary } from "../exports/interfaces";

/**
 * @function
 * @name salaryEmployeeUpdate
 * @description If employees updated - update employees in salaries
 * @returns {IEmployee[]} employeeType[]
 */
export const salaryEmployeeUpdate = (
    employees: Pick<IEmployee, "id" | "name" | "surname">[],
    salary: Pick<ISalary, "employeeId" | "name">[]
) => {
    const employee: employeeType[] = [];

    const mapped1: string[] = [...employees].map((elem) => elem.id);
    const mapped2: string[] = [...salary].map((elem) => elem.employeeId);
    const empsInSalaryById = mapped1.filter((id) => mapped2.includes(id));
    for (let i = 0; i < empsInSalaryById.length; i++) {
        const id = empsInSalaryById[i];
        // 1) находим сотрудника по которому прошли начисления
        const empInSalary = salary.find((emp) => emp.employeeId === id);
        // 2) находим его индекс
        const indexInSalary = salary.findIndex((emp) => emp.employeeId === id);
        // 3) находим сотрудника в store
        const empInStore = employees.find((emp) => emp.id === id)!;
        // 4) Получаем имя и фамилию сотрудника
        const name = empInSalary?.name.split(" ")[1];
        const surname = empInSalary?.name.split(" ")[0];
        // 5) Если имя либо фамилия отличаются пушим в массив
        if (empInStore.name !== name || empInStore.surname !== surname) {
            const id = empInStore.id;
            const index = indexInSalary;
            employee.push({ id, index });
        }
    }
    return employee;
};
