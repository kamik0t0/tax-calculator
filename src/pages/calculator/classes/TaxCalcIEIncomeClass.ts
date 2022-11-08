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
        return income! * rate;
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
        let usnFinal = 0;
        let recoupment = 0;
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
            if (usn - totalCost > usn / 2) {
                usnFinal = usn - totalCost;
                recoupment = totalCost;
                return [usnFinal, recoupment];
            } else {
                usnFinal = usn / 2;
                recoupment = usn / 2;
                return [usnFinal, recoupment];
            }
        } else {
            recoupment =
                retirementFixInsurance! + medicalFixInsurance! + floatInsurance;
            let usn = income! * rate - recoupment;
            usnFinal = usn > 0 ? usn : 0;
            return [usnFinal, recoupment];
        }
    }
    // Налоговая нагрузка
    static burden(total: number, income: number) {
        return total / income!;
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

        const [USN, recoupment] = this.USN({
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

        return [total, burden, USN, recoupment];
    }
}
