import { TaxCalc } from "../exports/classes";

export class TaxCalcIE extends TaxCalc {
    medicalFixInsurance: number;
    retirementFixInsurance: number;
    constructor(
        salaryTaxRate: number,
        medicalFixInsurance: number,
        retirementFixInsurance: number
    ) {
        super(salaryTaxRate);
        this.medicalFixInsurance = medicalFixInsurance;
        this.retirementFixInsurance = retirementFixInsurance;
    }

    // Страховые взносы 1% с доходов > 300 тыс. руб.
    static floatInsurance(income: number) {
        if (income > 300000) {
            return Math.round(((income - 300000) * 1) / 100);
        } else {
            return 0;
        }
    }
    // Страховые взносы ИП
    static totalInsurance(
        income: number,
        retirementFixInsurance: number,
        medicalFixInsurance: number
    ) {
        const floatInsurance = this.floatInsurance(income!);
        const totalInsurance = Math.round(
            retirementFixInsurance! + medicalFixInsurance! + floatInsurance
        );
        return totalInsurance;
    }
}
