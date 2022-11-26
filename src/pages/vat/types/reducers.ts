import { InvoiceProps } from "../exports/utils";

export interface IInvoiceValue {
    value: string | number;
    prop: string;
    table: string;
    index: number;
}

export interface InvoiceConstructor {
    value: string | number;
    prop: InvoiceProps;
    index: number;
    table: string;
}
