export class NDS {
    protected _income: number;
    protected _expenses: number;
    protected _salary: number;

    constructor(income: number, expenses: number, salary: number) {
        this._income = income;
        this._expenses = expenses;
        this._salary = salary;
    }
    // НДС с доходов
    get NDSAccrued(): number {
        return Math.round((this._income * 20) / 120);
    }
    // НДС вычет
    get NDSRecoupment(): number {
        return Math.round(((this._expenses - this._salary) * 20) / 120);
    }
    // НДС к уплате
    get tax(): number {
        const NDS = this.NDSAccrued - this.NDSRecoupment;
        return NDS >= 0 ? NDS : 0;
    }
}
