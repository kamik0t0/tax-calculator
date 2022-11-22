import { StaticRates, BasicRates } from "../exports/utils";

export class TaxCalc {
    protected readonly _income: number;
    protected readonly _salary: number;

    public readonly accident: number;
    public readonly social: number;
    public readonly medical: number;
    public readonly retirement: number;

    constructor(income: number = 0, salary: number = 0) {
        this._income = income;
        this._salary = salary;

        this.accident = this._salary * StaticRates.accident;
        this.social = this._salary * BasicRates.social;
        this.medical = this._salary * BasicRates.medical;
        this.retirement = this._salary * BasicRates.retirement;
    }

    protected get salaryTax(): number {
        return this.accident + this.medical + this.retirement + this.social;
    }

    // Налоговая нагрузка
    public burden(totalTax: number) {
        if (this._income > 0) return totalTax / this._income;
        return 0;
    }
}
