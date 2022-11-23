import { IInvoice, IInvoiceProp } from "../exports/interfaces";

class Invoice {
    private readonly _invoices: IInvoice[];
    private readonly _index: number;
    protected _invoice: IInvoice;

    constructor(invoices: IInvoice[], index: number) {
        this._invoices = invoices;
        this._index = index;
        this._invoice = Object.assign({}, this._invoices[this._index]);
    }
    protected isMixRate(rate: string): boolean {
        if (rate === "-1") return true;
        else return false;
    }
}

export class InvoiceRate extends Invoice implements IInvoiceProp<number> {
    constructor(invoices: IInvoice[], index: number) {
        super(invoices, index);
    }

    public createWith(rate: number): IInvoice {
        if (this.isMixRate(rate.toString())) {
            this._invoice.rate = -1;
        } else {
            const ratePercent = rate * 100;
            const rateDivider = ratePercent + 100;
            this._invoice.rate = rate;
            this._invoice.nds = +(
                (this._invoice.summ * ratePercent) /
                rateDivider
            ).toFixed(2);
        }

        return this._invoice;
    }
}

export class InvoiceSumm extends Invoice implements IInvoiceProp<number> {
    constructor(invoices: IInvoice[], index: number) {
        super(invoices, index);
    }

    public createWith(summ: number): IInvoice {
        if (this.isMixRate(this._invoice.rate.toString())) {
            this._invoice.summ = +summ;
        } else {
            const rate = this._invoice.rate * 100;
            const rateDivider = rate + 100;
            this._invoice.summ = summ;
            this._invoice.nds = +(
                (this._invoice.summ * rate) /
                rateDivider
            ).toFixed(2);
        }
        return this._invoice;
    }
}

export class InvoiceDate extends Invoice implements IInvoiceProp<number> {
    constructor(invoices: IInvoice[], index: number) {
        super(invoices, index);
    }

    public createWith(date: number): IInvoice {
        this._invoice.date = date;
        return this._invoice;
    }
}

export class InvoiceNum extends Invoice implements IInvoiceProp<string> {
    constructor(invoices: IInvoice[], index: number) {
        super(invoices, index);
    }

    public createWith(number: string): IInvoice {
        this._invoice.number = number;
        return this._invoice;
    }
}

export class InvoiceNDS extends Invoice implements IInvoiceProp<number> {
    constructor(invoices: IInvoice[], index: number) {
        super(invoices, index);
    }

    public createWith(nds: number): IInvoice {
        this._invoice.nds = nds;
        this._invoice.rate = -1;
        return this._invoice;
    }
}

export class InvoiceClient extends Invoice implements IInvoiceProp<string> {
    constructor(invoices: IInvoice[], index: number) {
        super(invoices, index);
    }

    public createWith(client: string): IInvoice {
        this._invoice.client = client;
        return this._invoice;
    }
}
