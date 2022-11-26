import { salaryEmployeeUpdate } from "./salaryEmployeeUpdate";
import { IEmployee } from "../types/salary";
import { mockEmployees, mockSalaryEmployees } from "../utils/mockData";

describe("Employee update", () => {
    test("Returns employee with different name", () => {
        expect(
            salaryEmployeeUpdate(mockEmployees, mockSalaryEmployees)
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
});
