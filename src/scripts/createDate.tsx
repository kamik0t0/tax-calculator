import { IInvoice } from "../interfaces/IInvoice";

export function createData(
    number: string,
    date: string,
    client: string,
    nds: number,
    summ: number,
    checked: boolean
): IInvoice {
    return { number, date, client, nds, summ, checked };
}
