export interface IInvoice {
    date: string;
    client: string;
    nds: number;
    summ: number;
    checked: boolean;
    [prop: string]: string | number | boolean;
}
