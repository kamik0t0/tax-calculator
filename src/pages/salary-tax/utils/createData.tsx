import { ISalary } from "../interfaces/ISalary";

function createData(
    id: string,
    employee: string,
    pay: number,
    accrued: number,
    childrenQtty: number,
    tax: number,
    insurance: {
        retirement: number;
        medical: number;
        social: number;
        accident: number;
        total: number;
    },
    insuranceTotal: number,
    checked: boolean
): ISalary {
    return {
        id,
        employee,
        pay,
        accrued,
        childrenQtty,
        tax,
        insurance,
        insuranceTotal,
        checked,
    };
}

export const newEmployee = createData(
    "",
    "",
    0,
    0,
    0,
    0,
    {
        retirement: 0,
        medical: 0,
        social: 0,
        accident: 0,
        total: 0,
    },
    0,
    false
);
