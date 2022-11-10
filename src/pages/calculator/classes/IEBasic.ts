import { IE } from "../exports/classes";
import { Limits } from "../exports/utils";

export class IEBasic extends IE {
    constructor(income: number, expenses: number, salary: number) {
        super(income, expenses, salary);
    }
    // НДС с доходов
    get vatAccrued() {
        return Math.round((this.income * 20) / 120);
    }
    // НДС вычет
    get vatRecoupment() {
        return Math.round(((this.expenses - this.salary) * 20) / 120);
    }
    // НДС к уплате
    get vat() {
        const vat = this.vatAccrued - this.vatRecoupment;
        return vat >= 0 ? vat : 0;
    }
    // Взносы с доходов ИП на общей системе
    get floatInsurance() {
        const limit = 300000;
        const test =
            this.income -
            this.expenses -
            this.accident -
            this.social -
            this.medical -
            this.retirement -
            this.retirementFixInsurance -
            this.medicalFixInsurance -
            limit -
            this.vat;

        const float = test / 101;

        let floatFinal = float >= 0 ? float : 0;
        floatFinal =
            floatFinal <= Limits.floatInsuranceLimit
                ? floatFinal
                : Limits.floatInsuranceLimit;

        return floatFinal;
    }
    // Итого взносы
    get totalInsurance() {
        return (
            this.floatInsurance +
            this.medicalFixInsurance +
            this.retirementFixInsurance +
            this.salaryTax
        );
    }
    // Налогооблагаемый НДФЛ доход
    get pitIncome() {
        return this.income - this.vatAccrued;
    }
    // Расходы уменьшающие НДФЛ
    get pitRecoupment() {
        return this.expenses - this.vatRecoupment + this.totalInsurance;
    }

    // Подоходный налог
    get pit() {
        return this.pitIncome - this.pitRecoupment > 0
            ? Math.round(((this.pitIncome - this.pitRecoupment) * 13) / 100)
            : 0;
    }
    // Итого налоги
    get totalTax() {
        return this.pit + this.vat + this.totalInsurance;
    }
}
