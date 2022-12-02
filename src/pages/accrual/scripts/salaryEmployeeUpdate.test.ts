import { IEmployee, ISalary } from "../exports/interfaces";
import { salaryEmployeeUpdate } from "./salaryEmployeeUpdate";

export const mockEmployees: Pick<IEmployee, "id" | "name" | "surname">[] = [
    {
        id: "VNfosE",
        name: "Данич",
        surname: "Зиянбаев",
    },
    {
        id: "j_KWa4",
        name: "Дашечка",
        surname: "Васюкова",
    },
    {
        id: "3",
        name: "BuBas",
        surname: "T",
    },
];

export const mockSalaryEmployees_1: Pick<ISalary, "employeeId" | "name">[] = [
    {
        employeeId: "VNfosE",
        name: "Зиянбаев Данич",
    },
    {
        employeeId: "3",
        name: "T BuBa",
    },
    {
        employeeId: "j_KWa4",
        name: "Васюкова Даша",
    },
];
export const mockSalaryEmployees_2: Pick<ISalary, "employeeId" | "name">[] = [
    {
        employeeId: "VNfosE",
        name: "Зиянбаев Данич",
    },
    {
        employeeId: "3",
        name: "T BuBas",
    },
    {
        employeeId: "j_KWa4",
        name: "Васюкова Даша",
    },
];

describe("Employee update", () => {
    test("Returns 2 employees array with different name", () => {
        expect(
            salaryEmployeeUpdate(mockEmployees, mockSalaryEmployees_1)
        ).toEqual([
            {
                id: "j_KWa4",
                index: 2,
            },
            {
                id: "3",
                index: 1,
            },
        ]);
    });
    test("Returns 1 employee array with different name", () => {
        expect(
            salaryEmployeeUpdate(mockEmployees, mockSalaryEmployees_2)
        ).toEqual([
            {
                id: "j_KWa4",
                index: 2,
            },
        ]);
    });
    test("Empty salary array. Returns empty array", () => {
        expect(salaryEmployeeUpdate(mockEmployees, [])).toEqual([]);
    });
    test("Empty both arrays. Returns empty array", () => {
        expect(salaryEmployeeUpdate([], [])).toEqual([]);
    });
    test("Empty employee array. Returns empty array", () => {
        expect(salaryEmployeeUpdate([], mockSalaryEmployees_2)).toEqual([]);
    });
});
