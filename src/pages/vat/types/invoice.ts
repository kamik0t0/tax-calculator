export interface IInvoice {
    number: string;
    date: number;
    client: string;
    nds: number;
    rate: number;
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

type total = {
    summ: number;
    nds: number;
};

export interface ISummary {
    purches: total;
    sales: total;
    issued: total;
    recieved: total;
    nds: number;
    [prop: string]: any;
}

export interface IInvoiceStorage {
    sales: IInvoice[];
    purches: IInvoice[];
    recieved: IInvoice[];
    issued: IInvoice[];
}

export interface IInvoiceProp<Type> {
    createWith(prop: Type): IInvoice;
}
