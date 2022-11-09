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

interface ISummary {
    purches: total;
    sales: total;
    issued: total;
    recieved: total;
    nds: number;
    [prop: string]: any;
}