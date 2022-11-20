import { IEmployee } from "../exports/interfaces";

export function setIsCivilContract(employees: IEmployee[], employeeId: string) {
    const employee: IEmployee | undefined = employees.find(
        (employee) => employee.id === employeeId
    );

    const isCivilContract = employee && employee.civilContract;
    return isCivilContract || false;
}
