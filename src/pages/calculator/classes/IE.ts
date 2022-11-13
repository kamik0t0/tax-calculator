import { Limits, FixInsuranceValues } from "../exports/utils";
import { TaxCalc } from "./CalcParent";

export class IE extends TaxCalc {
    protected readonly _medicalFixInsurance: number;
    protected readonly _retirementFixInsurance: number;
    protected readonly _floatInsuranceLimit: number;

    constructor(income: number, salary: number) {
        super(income, salary);
        this._floatInsuranceLimit = Limits.floatInsuranceLimit;
        this._medicalFixInsurance = FixInsuranceValues.medical;
        this._retirementFixInsurance = FixInsuranceValues.retirement;
    }

    // Страховые взносы 1% с доходов > 300 тыс. руб. но не более 275560 руб.
    public get floatInsurance(): number {
        if (this._income > 300000) {
            const floatInsurance = Math.round(
                ((this._income - 300000) * 1) / 100
            );
            return floatInsurance <= this._floatInsuranceLimit
                ? floatInsurance
                : this._floatInsuranceLimit;
        } else {
            return 0;
        }
    }

    // Страховые взносы ИП
    protected get totalInsurance(): number {
        return Math.round(
            this._retirementFixInsurance +
                this._medicalFixInsurance +
                this.floatInsurance +
                this.salaryTax
        );
    }
}
