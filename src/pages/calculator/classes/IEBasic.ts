import { IE } from "../exports/classes";
import { Limits } from "../exports/utils";
import { NDS } from "../exports/classes";

export class IEBasic extends IE {
    public readonly NDS: NDS;
    readonly expenses: number;

    constructor(income: number, expenses: number, salary: number) {
        super(income, salary);
        // композиция
        this.NDS = new NDS(income, expenses, salary);
        this.expenses = expenses;
    }
    public get floatInsurance() {
        const limit = 300000;
        const test =
            this._income -
            this.expenses -
            this.salaryTax -
            this._retirementFixInsurance -
            this._medicalFixInsurance -
            limit -
            this.NDS.tax;

        const float = test / 101;

        let floatFinal = float >= 0 ? float : 0;
        floatFinal =
            floatFinal <= Limits.floatInsuranceLimit
                ? floatFinal
                : Limits.floatInsuranceLimit;

        return floatFinal;
    }
    // Итого взносы
    public get totalInsurance(): number {
        return (
            this.floatInsurance +
            this._medicalFixInsurance +
            this._retirementFixInsurance +
            this.salaryTax
        );
    }
    // Налогооблагаемый НДФЛ доход
    public get NDFLIncome(): number {
        return this._income - this.NDS.NDSAccrued;
    }
    // Расходы уменьшающие базу по НДФЛ
    public get NDFLRecoupment(): number {
        return this.expenses - this.NDS.NDSRecoupment + this.totalInsurance;
    }

    // НДФЛ
    public get NDFL(): number {
        return this.NDFLIncome - this.NDFLRecoupment > 0
            ? Math.round(((this.NDFLIncome - this.NDFLRecoupment) * 13) / 100)
            : 0;
    }
    // Итого налоги
    public get totalTax(): number {
        return this.NDFL + this.NDS.tax + this.totalInsurance;
    }

    public get NDSRecoupment(): number {
        return this.NDS.NDSRecoupment;
    }
    public get NDSTax(): number {
        return this.NDS.tax;
    }
    public get NDSAccrued(): number {
        return this.NDS.NDSAccrued;
    }
}
