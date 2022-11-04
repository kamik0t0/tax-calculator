import { TaxCalc } from "../exports/classes";
import { calcData } from "../exports/types";

export class TaxCalcLLCExpenses extends TaxCalc {
    constructor(salaryTaxRate: number | undefined) {
        super(salaryTaxRate);
    }
    // минимальный налог
    static usnMinimal(income: number) {
        return income! * 0.01;
    }
    // Расходы
    static totalCost(salary: number, expenses: number, salaryTaxRate: number) {
        const salaryTax = this.salaryTax(salary, salaryTaxRate);
        return expenses! + salaryTax;
    }
    // УСН начислен 2.1
    static USN({ rate, income, salary, expenses, salaryTaxRate }: calcData) {
        const totalCost = this.totalCost(salary!, expenses!, salaryTaxRate!);

        const usn = Math.round((income! - totalCost!) * rate);
        const minimal = this.usnMinimal(income!);
        const usnFinal = usn > minimal ? usn : minimal;
        return [usnFinal, minimal];
    }
    // Налоговая нагрузка
    static burden(income: number, salaryTax: number, usn: number) {
        return Math.round(((salaryTax! + usn!) / income!) * 100);
    }
    // Итого налоги
    static totalTax({
        rate,
        income,
        salary,
        expenses,
        salaryTaxRate,
    }: calcData) {
        let total = 0;
        let burden = 0;
        if (income === 0 && salary === 0) return [total, burden, 0, 0];

        const [USN, minimal] = this.USN({
            rate,
            income,
            salary,
            expenses,
            salaryTaxRate,
        });

        const salaryTax =
            salary === 0 ? 0 : this.salaryTax(salary!, salaryTaxRate!);

        total = Math.round(USN + salaryTax);

        if (income! > 0) burden = this.burden(income!, salaryTax, USN);

        return [total, burden, USN, minimal];
    }
}
