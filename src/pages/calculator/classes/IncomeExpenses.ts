export class IncomeExpenses {
    protected _income: number;
    protected _expenses: number;
    protected _salary: number;
    protected _insurance: number;
    protected _taxRate: number;

    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number,
        costs: number
    ) {
        this._income = income;
        this._expenses = expenses;
        this._salary = salary;
        this._taxRate = taxRate;
        this._insurance = costs;
    }
    // Расчетный УСН
    get usnAccrued(): number {
        return Math.round((this._income - this.totalCost) * this._taxRate);
    }
    // Расходы
    get totalCost(): number {
        return Math.round(this._expenses + this._insurance);
    }
    // минимальный налог
    get minimal(): number {
        return this._income * 0.01;
    }
    // УСН
    get usn(): number {
        return this.usnAccrued > this.minimal ? this.usnAccrued : this.minimal;
    }
    // Итого налогов
    get totalTax(): number {
        return this._insurance + this.usn;
    }
}
