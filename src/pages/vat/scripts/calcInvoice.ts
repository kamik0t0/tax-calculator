import { IInvoice } from "../exports/interfaces";

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
            InvoiceToDispatch.date = +value;
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
