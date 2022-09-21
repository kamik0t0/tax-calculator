import { ids } from "webpack";

// таблица
interface IMonths {
    jan: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    feb: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    march: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    april: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    may: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    june: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    july: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    aug: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    sep: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    oct: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    nov: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    dec: {
        salary: ISalary[];
        summary: ISalarySummary;
    };
    [prop: string]: any;
}
// объект employee должен содержать данные сотрудника и его зарплату за все периоды
export interface IEmployee {
    id: string;
    name: string;
    surname: string;
    position: string;
    birth: string;
    sex?: string;
    patronymic?: string;
    [prop: string]: any;
}

export interface ISalary {
    employeeId: string;
    name: string;
    pay: number;
    accrued: number;
    childrenQtty: number;
    tax: number;
    insurance: IInsurance;
    insuranceTotal: number;
    checked: boolean;
    [prop: string]: any;
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
    rateCode: string;
    [prop: string]: any;
}

interface IInsurance {
    retirement: number;
    medical: number;
    social: number;
    accident: number;
}
