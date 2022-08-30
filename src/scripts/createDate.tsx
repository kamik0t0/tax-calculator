import { IInvoice } from "../interfaces/IInvoice";

export function createData(
    date: string,
    client: string,
    nds: number,
    summ: number,
    checked: boolean
): IInvoice {
    return { date, client, nds, summ, checked };
}
