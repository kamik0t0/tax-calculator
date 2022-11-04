import { TaxCalc } from "../exports/classes";
import { calcData } from "../exports/types";

// TODO: написано "на коленке". рефактор
export class TaxCalcLLCIncome extends TaxCalc {
    constructor(salaryTaxRate: number | undefined) {
        super(salaryTaxRate);
    }
    // УСН начислен 2.1
    static usnAccrued(rate: number, income: number) {
        return Math.round(income * rate);
    }
    // Налоговая нагрузка
    static burden(income: number, salaryTax: number, usn: number) {
        return Math.round(((salaryTax! + usn!) / income!) * 100);
    }
    // УСН к уплате 2
    static USN(
        rate: number,
        income: number,
        salary: number,
        salaryTaxRate: number
    ) {
        const salaryTax = this.salaryTax(salary!, salaryTaxRate!);

        if (salary! > 0) {
            let usn = Math.round(income! * rate);
            if (usn - salaryTax > (usn * 50) / 100) {
                return Math.round(usn - salaryTax);
            } else {
                return Math.round((usn * 50) / 100);
            }
        } else {
            let checkZeroIncome = income! * rate;
            return Math.round(checkZeroIncome > 0 ? checkZeroIncome : 0);
        }
    }
    // Итого налоги
    static totalTax({ rate, income, salary, salaryTaxRate }: calcData) {
        let total = 0;
        let burden = 0;
        if (income === 0 && salary === 0) return [total, burden, 0];

        const USN =
            income === 0 ? 0 : this.USN(rate, income!, salary!, salaryTaxRate!);

        const salaryTax =
            salary === 0 ? 0 : this.salaryTax(salary!, salaryTaxRate!);

        total = Math.round(USN + salaryTax);

        if (income! > 0) burden = this.burden(income!, salaryTax, USN);

        return [total, burden, USN];
    }
}
