import { IE } from "../exports/classes";

export class IEIncome extends IE {
    protected readonly _taxRate: number;

    constructor(income: number, salary: number, taxRate: number) {
        super(income, salary);
        this._taxRate = taxRate;
    }
    // УСН начислен
    private get usnAccrued(): number {
        return Math.round(this._income * this._taxRate);
    }
    // Налоговый вычет
    public get recoupment(): number {
        if (this._income > 0) {
            if (this._salary > 0) {
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
    public get totalTax(): number {
        return Math.round(this.usn + this.totalInsurance);
    }
    // УСН
    public get usn(): number {
        return this.usnAccrued - this.recoupment;
    }
}
