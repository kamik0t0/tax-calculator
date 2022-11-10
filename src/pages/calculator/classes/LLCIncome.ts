import { TaxCalc } from "../exports/classes";

export class LLCIncome extends TaxCalc {
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
    // УСН начислен 2.1
    get usnAccrued() {
        return Math.round(this.income * this.taxRate);
    }

    // Вычет по УСН
    get recoupment() {
        if (this.income > 0) {
            if (this.salary > 0) {
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
    // УСН к уплате 2
    get usn() {
        return this.usnAccrued - this.recoupment;
    }
    // Итого налоги
    get totalTax() {
        return Math.round(this.usn + this.salaryTax);
    }
}
