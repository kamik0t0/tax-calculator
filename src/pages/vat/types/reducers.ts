export interface IInvoiceValue {
    value: string | number;
    prop: string;
    table: string;
    index: number;
}

export interface InvoiceConstructor {
    value: string | number;
    prop: "nds" | "summ" | "client" | "rate" | "num" | "date";
    index: number;
    table: string;
}
