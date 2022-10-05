import { IInvoice, IInvoices } from "../../exports/interfaces";

export const calculateNDS = (state: IInvoices) => {
    state.summary.nds =
        state.summary.sales.nds +
        state.summary.recieved.nds -
        state.summary.purches.nds -
        state.summary.issued.nds;
    if (state.summary.nds < 0) state.summary.nds = 0;
};

export const calcSummary = (
    state: IInvoices,
    summary: { summ: number; nds: number },
    table: IInvoice[]
) => {
    summary.summ = table.reduce((acc, current) => acc + +current.summ, 0);
    summary.nds = table.reduce((acc, current) => acc + +current.nds, 0);

    state.summary.nds =
        state.summary.sales.nds +
        state.summary.recieved.nds -
        state.summary.purches.nds -
        state.summary.issued.nds;
    if (state.summary.nds < 0) state.summary.nds = 0;
};
// TODO: Прописать отдельную функцию для каждого случае и избавиться от switch
export const calcInvoice = (
    value: string | number,
    prop: string,
    invoices: IInvoice[],
    index: number
): IInvoice => {
    const InvoiceToDispatch: IInvoice = Object.assign({}, invoices[index]);

    switch (prop) {
        case "rate":
            const rate = +value * 100;
            const rateDivider = rate + 100;
            // если в накладной товары по разным ставкам
            if (value === "-1") {
                InvoiceToDispatch.rate = -1;
            } else {
                // обновить ставку
                InvoiceToDispatch.rate = +value;
                // пересчитать НДС
                InvoiceToDispatch.nds = +(
                    (InvoiceToDispatch.summ * rate) /
                    rateDivider
                ).toFixed(2);
            }
            break;
        case "summ":
            if (InvoiceToDispatch.rate === -1) {
                InvoiceToDispatch.summ = +value;
            } else {
                const rate = InvoiceToDispatch.rate * 100;
                const rateDivider = rate + 100;
                // присваиваем значение
                InvoiceToDispatch.summ = +value;
                // вычисляем НДС
                InvoiceToDispatch.nds = +(
                    (InvoiceToDispatch.summ * rate) /
                    rateDivider
                ).toFixed(2);
            }
            break;
        case "date":
            InvoiceToDispatch.date = Date.parse(value.toString());
            break;
        case "nds":
            InvoiceToDispatch.nds = +value;
            InvoiceToDispatch.rate = -1;
            break;
        default:
            InvoiceToDispatch[prop] = value;
            break;
    }

    return InvoiceToDispatch;
};
