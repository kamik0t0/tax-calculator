import { TaxCalc } from "../exports/classes";

export class LLCIncome extends TaxCalc {
    private readonly _taxRate: number;

    constructor(income: number, salary: number, taxRate: number) {
        super(income, salary);
        this._taxRate = taxRate;
    }
    // УСН начислен 2.1
    private get usnAccrued(): number {
        return Math.round(this._income * this._taxRate);
    }
    // Вычет по УСН
    public get recoupment(): number {
        if (this._income > 0) {
            if (this._salary > 0) {
                if (this.usnAccrued - this.salaryTax > this.usnAccrued / 2) {
                    return this.salaryTax;
                } else {
                    return this.usnAccrued / 2;
                }
            } else {
                if (this.salaryTax > this.usnAccrued) {
                    return this.usnAccrued;
                } else {
                    return this.salaryTax;
                }
            }
        } else {
            return 0;
        }
    }
    // Итого налоги
    public get totalTax(): number {
        return this.usn + this.salaryTax;
    }
    // УСН к уплате 2
    public get usn(): number {
        return this.usnAccrued - this.recoupment;
    }
}

const income = new LLCIncome(500000, 150000, 0.06);
const totalTax = income.totalTax;
const burden = income.burden(totalTax);
console.log(totalTax);
console.log(burden * 100);
