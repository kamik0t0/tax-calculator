import { IInvoice } from "../exports/interfaces";

function createData(
    number: string,
    date: number,
    client: string,
    rate: number,
    nds: number,
    summ: number,
    checked: boolean
): IInvoice {
    return { number, date, client, rate, nds, summ, checked };
}

export const newInvoice = createData(
    "№",
    Date.now(),
    "Контрагент",
    0.2,
    0,
    0,
    false
);
