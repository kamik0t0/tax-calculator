export class IncomeExpenses {
    private readonly _income: number;
    private readonly _expenses: number;
    private readonly _insurance: number;
    private readonly _taxRate: number;

    constructor(
        income: number,
        expenses: number,
        taxRate: number,
        costs: number
    ) {
        this._income = income;
        this._expenses = expenses;
        this._taxRate = taxRate;
        this._insurance = costs;
    }
    // Расчетный УСН
    private get usnAccrued(): number {
        return Math.round((this._income - this.totalCost) * this._taxRate);
    }
    // Расходы
    public get totalCost(): number {
        return Math.round(this._expenses + this._insurance);
    }
    // минимальный налог
    public get minimal(): number {
        return this._income * 0.01;
    }
    // УСН
    public get usn(): number {
        return this.usnAccrued > this.minimal ? this.usnAccrued : this.minimal;
    }
    // Итого налогов
    public get totalTax(): number {
        return this._insurance + this.usn;
    }
}
