import { IInvoice } from "../exports/interfaces";

function createData(
    number: string,
    date: string,
    client: string,
    nds: number,
    summ: number,
    checked: boolean
): IInvoice {
    return { number, date, client, nds, summ, checked };
}

export const newInvoice = createData(
    "№",
    new Date().toLocaleDateString(),
    "Контрагент",
    0,
    0,
    false
);
