import { IE } from "../exports/classes";
import { Limits } from "../exports/utils";
import { NDS } from "../exports/classes";

export class IEBasic extends IE {
    public NDS: NDS;
    constructor(income: number, expenses: number, salary: number) {
        super(income, expenses, salary);
        // агрегация
        this.NDS = new NDS(income, expenses, salary);
    }
    get floatInsurance() {
        const limit = 300000;
        const test =
            this.income -
            this.expenses -
            this.salaryTax -
            this.retirementFixInsurance -
            this.medicalFixInsurance -
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
    get totalInsurance(): number {
        return (
            this.floatInsurance +
            this.medicalFixInsurance +
            this.retirementFixInsurance +
            this.salaryTax
        );
    }
    // Налогооблагаемый НДФЛ доход
    get NDFLIncome(): number {
        return this.income - this.NDS.NDSAccrued;
    }
    // Расходы уменьшающие базу по НДФЛ
    get NDFLRecoupment(): number {
        return this.expenses - this.NDS.NDSRecoupment + this.totalInsurance;
    }

    // НДФЛ
    get NDFL(): number {
        return this.NDFLIncome - this.NDFLRecoupment > 0
            ? Math.round(((this.NDFLIncome - this.NDFLRecoupment) * 13) / 100)
            : 0;
    }
    // Итого налоги
    get totalTax(): number {
        return this.NDFL + this.NDS.tax + this.totalInsurance;
    }
}
