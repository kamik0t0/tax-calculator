import { IEmployee } from "../exports/interfaces";

/**
 * @function
 * @description is employee works as civil contractor
 * @name setIsCivilContract
 * @param {IEmployee[]} employees - employees array
 * @param {string} employeeId - employee id
 * @return {boolean} boolean
 */
export function setIsCivilContract(
    employees: IEmployee[],
    employeeId: string
): boolean {
    const employee: IEmployee | undefined = employees.find(
        (employee) => employee.id === employeeId
    );

    const isCivilContract = employee && employee.civilContract;
    return isCivilContract || false;
}
