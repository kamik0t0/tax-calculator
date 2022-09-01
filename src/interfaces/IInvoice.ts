import { ISummary } from "./ISummary";

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
    advPayIssued: IInvoice[];
    advPayRecieved: IInvoice[];
    summary: ISummary;
}
