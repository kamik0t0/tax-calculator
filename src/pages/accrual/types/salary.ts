import { Months } from "../exports/utils";

type TMonthName = Months;
type TMonthSalaryData = {
    salary: ISalary[];
    summary: ISalarySummary;
};
type TDynamicMonth = Record<string, TMonthSalaryData>;

export type IMonths = Record<TMonthName, TMonthSalaryData> & TDynamicMonth;

// объект employee должен содержать данные сотрудника и его зарплату за все периоды
export interface IEmployee {
    id: string;
    name: string;
    surname: string;
    position: string;
    birth: number;
    civilContract: boolean;
    sex?: string;
    patronymic?: string;
    [prop: string]: string | boolean | number | undefined;
}

export interface ISalary {
    id: string;
    employeeId: string;
    name: string;
    pay: number;
    accrued: number;
    cumulativeAccrual: number;
    overSocialLimit: number;
    overRetirmentLimit: number;
    insuranceRetirementBase: number;
    insuranceSocialBase: number;
    childrenQtty: number;
    tax: number;
    insurance: IInsurance;
    insuranceTotal: number;
    checked: boolean;
    civilContract: boolean;
    [prop: string]: string | number | boolean | IInsurance;
}

export interface ISalarySummary {
    accruedTotal: number;
    taxTotal: number;
    payTotal: number;
    insuranceTotal: number;
}

export interface ISalaries {
    months: IMonths;
    employees: IEmployee[];
    employee: IEmployee;
    rateCode: string;
    districtCoeff: number;
    minimalSalary: number;
    [prop: string]: IMonths | IEmployee | string | number | IEmployee[];
}

interface IInsurance {
    retirement: number;
    medical: number;
    social: number;
    accident: number;
}

type TDynamicSalary = Record<string, ISalary[]>;
export type ISalaryStorage = Record<Months, ISalary[]> & TDynamicSalary;

type TDynamicEmployee = Record<string, IEmployee[]>;
export type IEmployeeStorage = IStorageEmployees & TDynamicEmployee;

type IStorageEmployees = {
    employees: IEmployee[];
};
export type employeeType = {
    id: string;
    index: number;
};
