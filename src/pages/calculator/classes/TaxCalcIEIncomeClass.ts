import { TaxCalcIE } from "../exports/classes";
import { calcData } from "../exports/types";

// TODO: написано "на коленке". рефактор
export class TaxCalcIEIncome extends TaxCalcIE {
    constructor(
        salaryTaxRate: number,
        medicalFixInsurance: number,
        retirementFixInsurance: number
    ) {
        super(salaryTaxRate, medicalFixInsurance, retirementFixInsurance);
    }
    // Расходы
    static totalCost(
        income: number,
        salary: number,
        retirementFixInsurance: number,
        medicalFixInsurance: number,
        salaryTaxRate: number
    ) {
        const salaryTax = this.salaryTax(salary, salaryTaxRate);
        const totalInsurance = this.totalInsurance(
            income,
            retirementFixInsurance,
            medicalFixInsurance
        );
        return totalInsurance + salaryTax;
    }
    // УСН начислен
    static usnAccrued(rate: number, income: number) {
        return Math.round(income! * rate);
    }
    // УСН
    static USN({
        rate,
        income,
        salary,
        salaryTaxRate,
        retirementFixInsurance,
        medicalFixInsurance,
    }: calcData) {
        const totalCost = this.totalCost(
            income!,
            salary!,
            retirementFixInsurance!,
            medicalFixInsurance!,
            salaryTaxRate!
        );
        const floatInsurance = this.floatInsurance(income!);
        if (salary! > 0) {
            const usn = this.usnAccrued(rate, income!);
            if (usn - totalCost > usn / 2) return Math.round(usn - totalCost);
            else return Math.round(usn / 2);
        } else {
            let check =
                income! * rate -
                retirementFixInsurance! -
                medicalFixInsurance! -
                floatInsurance;
            return Math.round(check > 0 ? check : 0);
        }
    }
    // Налоговая нагрузка
    static burden(total: number, income: number) {
        return Math.round((total / income!) * 100);
    }
    // Итого налоги
    static totalTax({
        rate,
        income,
        salary,
        retirementFixInsurance,
        medicalFixInsurance,
        salaryTaxRate,
    }: calcData) {
        let total = 0;
        let burden = 0;
        const totalInsurance = this.totalInsurance(
            income!,
            retirementFixInsurance!,
            medicalFixInsurance!
        );

        if (income === 0 && salary === 0) return [totalInsurance, burden, 0];

        const USN = this.USN({
            rate,
            income,
            salary,
            salaryTaxRate,
            retirementFixInsurance,
            medicalFixInsurance,
        });

        const salaryTax =
            salary === 0 ? 0 : this.salaryTax(salary!, salaryTaxRate!);

        if (income! > 0) {
            total = salaryTax + USN + totalInsurance;
            burden = this.burden(total, income!);
        }
        if (income! === 0 && salary! > 0) {
            total = salaryTax + totalInsurance;
            burden = 100;
        }

        return [total, burden, USN];
    }
}
