import { TaxCalc } from "../exports/classes";

export class LLCBasic extends TaxCalc {
    public taxRate: number;
    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, expenses, salary);
        this.taxRate = taxRate;
    }
    // НДС с доходов
    get vatAccrued() {
        return Math.round((this.income * 20) / 120);
    }
    // НДС вычет
    get vatRecoupment() {
        return Math.round(((this.expenses - this.salary) * 20) / 120);
    }
    // НДС к уплате
    get vat() {
        const vat = this.vatAccrued - this.vatRecoupment;
        return vat >= 0 ? vat : 0;
    }

    // База по НП
    get LLCIncome() {
        return this.income - this.vatAccrued;
    }
    // Расходы уменьшающие НП
    get LLCRecoupment() {
        return this.expenses - this.vatRecoupment + this.salaryTax;
    }

    // Налог на прибыль
    get LLCIncomeTax() {
        const FedLLCTaxRate = 0.03;
        const TotalLLCTaxRate = FedLLCTaxRate + this.taxRate;

        return Math.round(
            (this.LLCIncome - this.LLCRecoupment) * TotalLLCTaxRate
        );
    }
    // Итого налоги
    get totalTax() {
        return this.LLCIncomeTax + this.vat + this.salaryTax;
    }
}
