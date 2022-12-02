import { IEmployee, ISalary } from "../exports/interfaces";
import { salaryEmployeeDelete } from "./salaryEmployeeDelete";

const mockEmployees: Pick<IEmployee, "id">[] = [
    {
        id: "VNfosE",
    },
    {
        id: "j_KWa4",
    },
];

const mockSalaryEmployees: Partial<Pick<ISalary, "employeeId" | "id">[]> = [
    {
        employeeId: "VNfosE",
        id: "kdk4",
    },
    {
        employeeId: "3",
        id: "kem3",
    },
    {
        employeeId: "j_KWa4",
        id: "pem7",
    },
];

describe("Delete employees", () => {
    test("2 left in salaries, 1 deleted", () => {
        expect(
            salaryEmployeeDelete(mockEmployees, mockSalaryEmployees)
        ).toEqual([
            {
                id: "kdk4",
                employeeId: "VNfosE",
            },
            {
                id: "pem7",
                employeeId: "j_KWa4",
            },
        ]);
    });
    test("[]", () => {
        expect(salaryEmployeeDelete([], mockSalaryEmployees)).toEqual([]);
    });
    test("null", () => {
        expect(salaryEmployeeDelete(mockEmployees, [])).toBe(null);
    });
});
