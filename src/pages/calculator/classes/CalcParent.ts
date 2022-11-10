import { salaryRate, StaticRates, BasicRates } from "../exports/utils";

export class TaxCalc {
    public income: number;
    public expenses: number;
    public salary: number;
    protected _accident: number;
    protected _social: number;
    protected _medical: number;
    protected _retirement: number;
    protected _salaryTaxRate: number;

    constructor(income: number = 0, expenses: number = 0, salary: number = 0) {
        this.income = income;
        this.expenses = expenses;
        this.salary = salary;
        this._salaryTaxRate = salaryRate;
        this._accident = this.salary * StaticRates.accident;
        this._social = this.salary * BasicRates.social;
        this._medical = this.salary * BasicRates.medical;
        this._retirement = this.salary * BasicRates.retirement;
    }

    set salaryTaxRate(rate: number) {
        if (rate < 0) {
            this._salaryTaxRate = 0;
        } else {
            this._salaryTaxRate = rate;
        }
    }

    get salaryTaxRate() {
        return this._salaryTaxRate;
    }

    get accident() {
        return this._accident;
    }

    get social() {
        return this._social;
    }

    get retirement() {
        return this._retirement;
    }

    get medical() {
        return this._medical;
    }

    get salaryTax() {
        return Math.round(this.salary * this._salaryTaxRate);
    }

    // Налоговая нагрузка
    burden(totalTax: number) {
        if (this.income > 0) return totalTax / this.income;
        else return 100;
    }
}
