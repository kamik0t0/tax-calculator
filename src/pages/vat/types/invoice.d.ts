import { ISummary } from "./summary";

export interface IInvoice {
    number: string;
    date: string;
    client: string;
    nds: number;
    summ: number;
    checked: boolean;
    [prop: string]: string | number | boolean;
}

export interface IInvoices {
    sales: IInvoice[];
    purches: IInvoice[];
    issued: IInvoice[];
    recieved: IInvoice[];
    summary: ISummary;
    [prop: string]: any;
}
