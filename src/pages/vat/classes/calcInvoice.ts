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
// мапа в которой свойство - ключ соответствует классу; инициализируется в конструкторе класса Invoice Расширение функциональности класса таким образом осуществляется путем создания нового класса с методом updateWith и добавления его в map.
export const propsMap = new Map()
    .set(InvoiceProps.rate, new InvoiceRate())
    .set(InvoiceProps.client, new InvoiceClient())
    .set(InvoiceProps.date, new InvoiceDate())
    .set(InvoiceProps.summ, new InvoiceSumm())
    .set(InvoiceProps.num, new InvoiceNum())
    .set(InvoiceProps.nds, new InvoiceNDS());
// класс который получает параметры из внешнего мира и через метод create находит в map соотвествие классу по ключу из prop, возвращает этот класс и выполняет метод updateWith который каждый из классов имплементирует через интерфейс IInvoiceProp<T>.
export class Invoice {
    private readonly _invoices: IInvoice[];
    private readonly _index: number;
    private readonly _prop: string;
    private readonly _value: string | number;
    private readonly _map: Map<string, IInvoiceProp<number | string>>;

    constructor(
        value: string | number,
        prop: string,
        invoices: IInvoice[],
        index: number
    ) {
        this._invoices = invoices;
        this._index = index;
        this._prop = prop;
        this._value = value;
        this._map = propsMap;
    }

    protected get _invoice(): IInvoice {
        return Object.assign({}, this._invoices[this._index]);
    }

    public create(): IInvoice | null {
        return this._map
            .get(this._prop)!
            .updateWith(this._value, this._invoice);
    }
}
