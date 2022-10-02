// В случае изменения данных сотрудника в стейте employees функция ищет такого сотрудника в таблицах начислений и, если находит, вносит соответствующие обновления
export const salaryEmployeeUpdate = <
    T extends { id: string; name: string; surname: string },
    S extends { employeeId: string; name: string }
>(
    employees: T[],
    salary: S[]
) => {
    type employeeType = {
        id: string;
        index: number;
    };

    const employee: employeeType = { id: "", index: -1 };

    const mapped1: string[] = [...employees].map((elem) => elem.id);
    const mapped2: string[] = [...salary].map((elem) => elem.employeeId);
    // находим id всех сотрудников по которым прошли начисления в текущем месяце
    const employeesInMonthById = mapped1.filter((id) => mapped2.includes(id));
    // по каждому сотруднику:
    employeesInMonthById.forEach((id) => {
        // 1) находим сотрудника по которому прошли начисления в исходном массиве
        const employeeInMonth = salary.find((empl) => empl.employeeId === id);
        // 2) находим его индекс
        const index = salary.findIndex((empl) => empl.employeeId === id);
        // 3) находим сотрудника в store
        const employeeInStore = employees.find((emp) => emp.id === id)!;
        // 4) Получаем имя и фамилию сотрудника
        const name = employeeInMonth?.name.split(" ")[1];
        const surname = employeeInMonth?.name.split(" ")[0];

        // Если имя / фамилия сотрудника не совпадает с тем что в store employees то присваиваем id и индекс в таблице
        if (
            employeeInStore?.name !== name ||
            employeeInStore?.surname !== surname
        ) {
            employee.id = employeeInStore.id;
            employee.index = index;
        }
    });
    // возвращаем либо объект с новым имененм и его индекс либо null
    if (employee.id !== "") {
        return employee;
    } else return null;
};
