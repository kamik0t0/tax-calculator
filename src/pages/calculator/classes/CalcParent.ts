import { StaticRates, BasicRates } from "../exports/utils";

export class TaxCalc {
    public income: number;
    public expenses: number;
    public salary: number;
    protected _accident: number;
    protected _social: number;
    protected _medical: number;
    protected _retirement: number;

    constructor(income: number = 0, expenses: number = 0, salary: number = 0) {
        this.income = income;
        this.expenses = expenses;
        this.salary = salary;

        this._accident = this.salary * StaticRates.accident;
        this._social = this.salary * BasicRates.social;
        this._medical = this.salary * BasicRates.medical;
        this._retirement = this.salary * BasicRates.retirement;
    }

    get accident(): number {
        return this._accident;
    }

    get social(): number {
        return this._social;
    }

    get retirement(): number {
        return this._retirement;
    }

    get medical(): number {
        return this._medical;
    }

    get salaryTax(): number {
        return this._accident + this._medical + this._retirement + this._social;
    }

    // Налоговая нагрузка
    burden(totalTax: number) {
        if (this.income > 0) return totalTax / this.income;
        else return 100;
    }
}
