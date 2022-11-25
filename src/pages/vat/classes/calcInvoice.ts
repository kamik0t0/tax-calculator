import { IInvoice, IInvoiceProp } from "../exports/interfaces";
import { InvoiceProps } from "../exports/utils";

// 6 классов реализующих различную логику в методе updateWith
export class InvoiceRate implements IInvoiceProp<number> {
    public updateWith(rate: number, invoice: IInvoice): IInvoice {
        if (rate.toString() === "-1") {
            invoice.rate = -1;
        } else {
            const ratePercent = rate * 100;
            const rateDivider = ratePercent + 100;
            invoice.rate = rate;
            invoice.nds = +((invoice.summ * ratePercent) / rateDivider).toFixed(
                2
            );
        }

        return invoice;
    }
}

export class InvoiceSumm implements IInvoiceProp<number> {
    public updateWith(summ: number, invoice: IInvoice): IInvoice {
        if (invoice.rate.toString() === "-1") {
            invoice.summ = +summ;
        } else {
            const rate = invoice.rate * 100;
            const rateDivider = rate + 100;
            invoice.summ = summ;
            invoice.nds = +((invoice.summ * rate) / rateDivider).toFixed(2);
        }
        return invoice;
    }
}

export class InvoiceNDS implements IInvoiceProp<number> {
    public updateWith(nds: number, invoice: IInvoice): IInvoice {
        invoice.nds = nds;
        invoice.rate = -1;
        return invoice;
    }
}

export class InvoiceDate implements IInvoiceProp<number> {
    public updateWith(date: number, invoice: IInvoice): IInvoice {
        invoice.date = date;
        return invoice;
    }
}

export class InvoiceNum implements IInvoiceProp<string> {
    public updateWith(num: string, invoice: IInvoice): IInvoice {
        invoice.number = num;
        return invoice;
    }
}

export class InvoiceClient implements IInvoiceProp<string> {
    public updateWith(client: string, invoice: IInvoice): IInvoice {
        invoice.client = client;
        return invoice;
    }
}

// Map в которой свойство-ключ соответствует классу; инициализируется в конструкторе класса Invoice Расширение функциональности класса таким образом осуществляется путем создания нового класса с методом updateWith и добавления его в map.
export const propsMap = new Map()
    .set(InvoiceProps.rate, new InvoiceRate())
    .set(InvoiceProps.client, new InvoiceClient())
    .set(InvoiceProps.date, new InvoiceDate())
    .set(InvoiceProps.summ, new InvoiceSumm())
    .set(InvoiceProps.num, new InvoiceNum())
    .set(InvoiceProps.nds, new InvoiceNDS());
