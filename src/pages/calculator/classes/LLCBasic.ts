import { TaxCalc, NDS } from "../exports/classes";

export class LLCBasic extends TaxCalc {
    public NDS: NDS;
    private _taxRate: number;
    private readonly _expenses: number;
    private readonly _FedLLCProfitRate: number;

    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, salary);
        this._taxRate = taxRate;
        // композиция, поскольку объект НДС создается в конструкторе класса но не приходит параметромв этот конструктор
        this.NDS = new NDS(income, expenses, salary);
        this._expenses = expenses;
        this._FedLLCProfitRate = 0.03;
    }
    // База по НП
    public get LLCIncome(): number {
        return this._income - this.NDS.NDSAccrued;
    }
    // Расходы уменьшающие НП
    public get LLCRecoupment(): number {
        return this._expenses - this.NDS.NDSRecoupment + this.salaryTax;
    }
    // Налог на прибыль
    public get LLCIncomeTax(): number {
        const TotalLLCTaxRate = this._FedLLCProfitRate + this._taxRate;
        const base = this.LLCIncome - this.LLCRecoupment;
        return base >= 0
            ? Math.round(
                  (this.LLCIncome - this.LLCRecoupment) * TotalLLCTaxRate
              )
            : 0;
    }
    // Итого налоги
    public get totalTax(): number {
        return this.LLCIncomeTax + this.NDS.tax + this.salaryTax;
    }

    public get NDSRecoupment(): number {
        return this.NDS.NDSRecoupment;
    }
    public get NDSTax(): number {
        return this.NDS.tax;
    }
    public get NDSAccrued(): number {
        return this.NDS.NDSAccrued;
    }
}
