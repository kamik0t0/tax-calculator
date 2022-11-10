import { TaxCalc, NDS } from "../exports/classes";

export class LLCBasic extends TaxCalc {
    public NDS: NDS;
    public taxRate: number;
    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, expenses, salary);
        this.taxRate = taxRate;
        // агрегация
        this.NDS = new NDS(income, expenses, salary);
    }
    // База по НП
    get LLCIncome(): number {
        return this.income - this.NDS.NDSAccrued;
    }
    // Расходы уменьшающие НП
    get LLCRecoupment(): number {
        return this.expenses - this.NDS.NDSRecoupment + this.salaryTax;
    }
    // Налог на прибыль
    get LLCIncomeTax(): number {
        const FedLLCTaxRate = 0.03;
        const TotalLLCTaxRate = FedLLCTaxRate + this.taxRate;

        return Math.round(
            (this.LLCIncome - this.LLCRecoupment) * TotalLLCTaxRate
        );
    }
    // Итого налоги
    get totalTax(): number {
        return this.LLCIncomeTax + this.NDS.tax + this.salaryTax;
    }
}
