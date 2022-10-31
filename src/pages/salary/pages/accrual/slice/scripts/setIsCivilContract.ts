import { ISalaries, IEmployee } from "../../types/salary";

export function setIsCivilContract(state: ISalaries, employeeId: string) {
    const employee: IEmployee | undefined = state.employees.find(
        (employee) => employee.id === employeeId
    );

    const isCivilContract = employee && employee.civilContract;
    return isCivilContract || false;
}
