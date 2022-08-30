import { IInvoice } from "../interfaces/IInvoice";

// сортировки по:
// - дате
export function sortByDate(
    invoices: IInvoice[],
    sortOrder: boolean
): IInvoice[] {
    return sortOrder
        ? invoices.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        : invoices.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
// - контрагенту
export function sortByCounterparty(
    invoices: IInvoice[],
    sortOrder: boolean
): IInvoice[] {
    return sortOrder
        ? invoices.sort((a, b) => a.client.localeCompare(b.client))
        : invoices.sort((a, b) => b.client.localeCompare(a.client));
}
// - сумме
export function sortBySumm(
    invoices: IInvoice[],
    sortOrder: boolean
): IInvoice[] {
    return sortOrder
        ? invoices.sort((a, b) => +a.summ - +b.summ)
        : invoices.sort((a, b) => +b.summ - +a.summ);
}
