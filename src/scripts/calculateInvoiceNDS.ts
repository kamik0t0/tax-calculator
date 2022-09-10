import { IInvoice } from "../pages/nds/interfaces/IInvoice";

export const calculateInvoiceNDS = (
    invoices: IInvoice[],
    index: number,
    value: string,
    prop: string
): IInvoice[] => {
    const InvoicesToDispatch = [...invoices].map((invoice: IInvoice) =>
        Object.assign({}, invoice)
    );
    if (prop === "summ") {
        // присваиваем значение
        InvoicesToDispatch[index][prop] = +value;
        // вычисляем НДС
        InvoicesToDispatch[index].nds = +((+value * 20) / 120).toFixed(2);
    }
    InvoicesToDispatch[index][prop] = value;
    return InvoicesToDispatch;
};
