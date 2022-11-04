import { TaxCalcIE } from "../exports/classes";
import { calcData } from "../exports/types";

// TODO: написано "на коленке". рефактор
export class TaxCalcIEExpenses extends TaxCalcIE {
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
        expenses: number,
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
        return expenses! + totalInsurance + salaryTax;
    }
    // минимальный налог
    static usnMinimal(income: number) {
        return (income! * 1) / 100;
    }
    // УСН
    static USN({
        rate,
        income,
        salary,
        expenses,
        retirementFixInsurance,
        medicalFixInsurance,
        salaryTaxRate,
    }: calcData) {
        const totalCost = this.totalCost(
            income!,
            salary!,
            expenses!,
            retirementFixInsurance!,
            medicalFixInsurance!,
            salaryTaxRate!
        );

        const usn = Math.round((income! - totalCost!) * rate);
        const minimal = this.usnMinimal(income!);
        const usnFinal = usn > minimal ? usn : minimal;
        return [usnFinal, minimal];
    }

    // Итого налоги
    static totalTax({
        rate,
        income,
        salary,
        expenses,
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

        if (income === 0 && salary === 0) return [totalInsurance, burden, 0, 0];

        const [USN, minimal] = this.USN({
            rate,
            income,
            salary,
            expenses,
            salaryTaxRate,
            retirementFixInsurance,
            medicalFixInsurance,
        });
        const salaryTax =
            salary === 0 ? 0 : this.salaryTax(salary!, salaryTaxRate!);

        total = Math.round(totalInsurance + USN + salaryTax);

        if (income! > 0) {
            burden = Math.round(
                ((salaryTax + USN + totalInsurance) / income!) * 100
            );
        }
        return [total, burden, USN, minimal];
    }
}
