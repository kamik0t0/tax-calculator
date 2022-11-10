import { Limits, FixInsuranceValues } from "../exports/utils";
import { TaxCalc } from "./CalcParent";

export class IE extends TaxCalc {
    protected _medicalFixInsurance: number;
    protected _retirementFixInsurance: number;
    protected _floatInsuranceLimit: number;

    constructor(income: number, expenses: number, salary: number) {
        super(income, expenses, salary);
        this._floatInsuranceLimit = Limits.floatInsuranceLimit;
        this._medicalFixInsurance = FixInsuranceValues.medical;
        this._retirementFixInsurance = FixInsuranceValues.retirement;
    }

    // Страховые взносы 1% с доходов > 300 тыс. руб. но не более 275560 руб.
    get floatInsurance(): number {
        if (this.income > 300000) {
            const floatInsurance = Math.round(
                ((this.income - 300000) * 1) / 100
            );
            return floatInsurance <= this._floatInsuranceLimit
                ? floatInsurance
                : this._floatInsuranceLimit;
        } else {
            return 0;
        }
    }

    // Страховые взносы ИП
    get totalInsurance(): number {
        return Math.round(
            this._retirementFixInsurance +
                this._medicalFixInsurance +
                this.floatInsurance +
                this.salaryTax
        );
    }

    get floatInsuranceLimit(): number {
        return this._floatInsuranceLimit;
    }

    get medicalFixInsurance(): number {
        return this._medicalFixInsurance;
    }

    get retirementFixInsurance(): number {
        return this._retirementFixInsurance;
    }
}
