import { IEmployee, ISalary } from "../types/salary";

export const mockEmployees: IEmployee[] = [
    {
        id: "VNfosE",
        name: "Данич",
        surname: "Зиянбаев",
        position: "Software Engeneer",
        birth: 13051986,
        civilContract: true,
    },
    {
        id: "j_KWa4",
        name: "Дашечка",
        surname: "Васюкова",
        position: "Manager",
        birth: 13051986343,
        civilContract: true,
    },
    {
        id: "3",
        name: "BuBas",
        surname: "T",
        position: "Symbol",
        birth: 13051986,
        civilContract: false,
    },
];

export const mockSalaryEmployees: Pick<ISalary, "employeeId" | "name">[] = [
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
