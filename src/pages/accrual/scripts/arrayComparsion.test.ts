import { arrayComparsion } from "./arrayComparsion";

const employees_1 = [{ id: "12v" }, { id: "45d" }, { id: "25" }];
const ids = ["12v", "45d", "25"];
const employees_2 = [
    { id: "12v" },
    { id: "45d" },
    { id: "25" },
    { id: "38ffd" },
];
const salary = [{ employeeId: "12v" }, { employeeId: "45d" }];

describe("Exclude employees", () => {
    test("One employee left", () => {
        expect(arrayComparsion(employees_1, salary)).toEqual([{ id: "25" }]);
    });
    test("Two employees left", () => {
        expect(arrayComparsion(employees_2, salary)).toEqual([
            { id: "25" },
            { id: "38ffd" },
        ]);
    });
    test("[]", () => {
        expect(arrayComparsion([], salary)).toEqual([]);
    });
    test("All employees left", () => {
        expect(arrayComparsion(employees_1, [])).toEqual(employees_1);
    });
});
