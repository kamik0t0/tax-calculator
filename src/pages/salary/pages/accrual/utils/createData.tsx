import { IEmployee, ISalary } from "../exports/interfaces";

function createData(
    id: string,
    employeeId: string,
    name: string,
    pay: number,
    accrued: number,
    cumulativeAccrual: number,
    overSocialLimit: number,
    overRetirmentLimit: number,
    insuranceRetirementBase: number,
    insuranceSocialBase: number,
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
    checked: boolean,
    civilContract: boolean
): ISalary {
    return {
        id,
        employeeId,
        name,
        pay,
        accrued,
        cumulativeAccrual,
        overSocialLimit,
        overRetirmentLimit,
        insuranceRetirementBase,
        insuranceSocialBase,
        childrenQtty,
        tax,
        insurance,
        insuranceTotal,
        checked,
        civilContract,
    };
}

export const newSalaryTableRow = createData(
    "",
    "",
    "",
    0,
    0,
    0,
    0,
    0,
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
    false,
    false
);

export const newEmployee: IEmployee = {
    id: "",
    name: "",
    surname: "",
    position: "",
    birth: 0,
};
