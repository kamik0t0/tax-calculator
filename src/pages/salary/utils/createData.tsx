import { IEmployee, ISalary } from "../exports/interfaces";

function createData(
    employeeId: string,
    name: string,
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
        employeeId,
        name,
        pay,
        accrued,
        childrenQtty,
        tax,
        insurance,
        insuranceTotal,
        checked,
    };
}

export const newSalaryTableRow = createData(
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

export const newEmployee: IEmployee = {
    id: "",
    name: "",
    surname: "",
    patronymic: "",
    position: "",
    birth: "",
    sex: "",
};
