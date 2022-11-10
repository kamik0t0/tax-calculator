import { IE } from "../exports/classes";

export class IEIncome extends IE {
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
    // УСН начислен
    get usnAccrued(): number {
        return Math.round(this.income * this.taxRate);
    }
    // Налоговый вычет
    get recoupment(): number {
        if (this.income > 0) {
            if (this.salary > 0) {
                if (
                    this.usnAccrued - this.totalInsurance >
                    this.usnAccrued / 2
                ) {
                    return this.totalInsurance;
                } else {
                    return this.usnAccrued / 2;
                }
            } else {
                const recoupment =
                    this._retirementFixInsurance +
                    this._medicalFixInsurance +
                    this.floatInsurance;
                if (recoupment > this.usnAccrued) {
                    return this.usnAccrued;
                } else {
                    return recoupment;
                }
            }
        } else {
            return 0;
        }
    }
    // Итого налоги
    get totalTax(): number {
        return Math.round(this.usn + this.totalInsurance);
    }
    // УСН
    get usn(): number {
        return this.usnAccrued - this.recoupment;
    }
}
