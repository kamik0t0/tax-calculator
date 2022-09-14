interface IInsurance {
    retirement: number;
    medical: number;
    social: number;
    accident: number;
}

interface IMonths {
    jan: { salary: ISalary[]; summary: ISalarySummary };
    feb: { salary: ISalary[]; summary: ISalarySummary };
    march: { salary: ISalary[]; summary: ISalarySummary };
    april: { salary: ISalary[]; summary: ISalarySummary };
    may: { salary: ISalary[]; summary: ISalarySummary };
    june: { salary: ISalary[]; summary: ISalarySummary };
    july: { salary: ISalary[]; summary: ISalarySummary };
    aug: { salary: ISalary[]; summary: ISalarySummary };
    sep: { salary: ISalary[]; summary: ISalarySummary };
    oct: { salary: ISalary[]; summary: ISalarySummary };
    nov: { salary: ISalary[]; summary: ISalarySummary };
    dec: { salary: ISalary[]; summary: ISalarySummary };
    [prop: string]: any;
}

export interface IEmployees {
    id: string;
    name: string;
    surname: string;
    childrenQtty: number;
    sex?: string;
    patronymic?: string;
}

export interface ISalary {
    id: string;
    employee: string;
    pay: number;
    accrued: number;
    childrenQtty: number;
    tax: number;
    insurance: IInsurance;
    insuranceTotal: number;
    checked: boolean;
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
    rateCode: string;
    employees: IEmployees[];
    [prop: string]: any;
}
