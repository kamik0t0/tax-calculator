import { IInvoice } from "./IInvoice";
export interface IInvoices {
    invoices: IInvoice[];
    totalSumm: number;
    totalNDS: number;
}
