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
        return (salaryTax! + usn!) / income!;
    }
    // УСН к уплате 2
    static USN(
        rate: number,
        income: number,
        salary: number,
        salaryTaxRate: number
    ) {
        let usnFinal = 0;
        let recoupment = 0;
        const salaryTax = this.salaryTax(salary!, salaryTaxRate!);
        if (salary! > 0) {
            let usn = Math.round(income! * rate);
            if (usn - salaryTax > (usn * 50) / 100) {
                usnFinal = usn - salaryTax;
                recoupment = salaryTax;
                return [usnFinal, recoupment] as const;
            } else {
                usnFinal = usn / 2;
                recoupment = usn / 2;
                return [usnFinal, recoupment] as const;
            }
        } else {
            let checkZeroIncome = income! * rate;
            usnFinal = checkZeroIncome > 0 ? checkZeroIncome : 0;
            recoupment = 0;
            return [usnFinal, recoupment] as const;
        }
    }
    // Итого налоги
    static totalTax({ rate, income, salary, salaryTaxRate }: calcData) {
        let total = 0;
        let burden = 0;
        if (income === 0 && salary === 0) return [total, burden, 0];
        const [USN, recoupment] = this.USN(
            rate,
            income!,
            salary!,
            salaryTaxRate!
        );

        const salaryTax =
            salary === 0 ? 0 : this.salaryTax(salary!, salaryTaxRate!);

        total = Math.round(USN + salaryTax);

        if (income! > 0) burden = this.burden(income!, salaryTax, USN);

        return [total, burden, USN, recoupment];
    }
}
