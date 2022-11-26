import { employeeType, IEmployee, ISalary } from "../exports/interfaces";

/**
 * @function
 * @description If employee updated - update employee in salaries
 * @returns {null | IEmployee} null | IEmployee
 */
export const salaryEmployeeUpdate = (
    employees: IEmployee[],
    salary: Pick<ISalary, "employeeId" | "name">[]
) => {
    const employee: employeeType[] = [];

    const mapped1: string[] = [...employees].map((elem) => elem.id);
    const mapped2: string[] = [...salary].map((elem) => elem.employeeId);
    // находим id всех сотрудников по которым прошли начисления в текущем месяце
    const employeesInSalaryById = mapped1.filter((id) => mapped2.includes(id));
    // по каждому сотруднику:
    for (let i = 0; i < employeesInSalaryById.length; i++) {
        const id = employeesInSalaryById[i];
        // 1) находим сотрудника по которому прошли начисления
        const employeeInSalary = salary.find((emp) => emp.employeeId === id);

        // 2) находим его индекс
        const employeeIndexInSalary = salary.findIndex(
            (emp) => emp.employeeId === id
        );
        // 3) находим сотрудника в store
        const employeeInStore = employees.find((emp) => emp.id === id)!;
        // 4) Получаем имя и фамилию сотрудника
        const name = employeeInSalary?.name.split(" ")[1];
        const surname = employeeInSalary?.name.split(" ")[0];
        // Если имя / фамилия сотрудника не совпадает с тем что в store employees то присваиваем id и индекс в Salary
        if (
            employeeInStore.name !== name ||
            employeeInStore.surname !== surname
        ) {
            const id = employeeInStore.id;
            const index = employeeIndexInSalary;
            employee.push({ id, index });
        }
        // возвращаем либо объект с новым имененм и его индекс либо null
    }
    return employee;
    // if (employee.id !== "") {
    //     return employee;
    // } else return null;
};
