import { IInvoice, IInvoiceProp } from "../exports/interfaces";
import { propsMap } from "../exports/utils";

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
