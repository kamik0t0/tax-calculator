import { TaxCalcIE } from "../exports/classes";
import { calcData } from "../exports/types";
import { BasicRates, StaticRates } from "../exports/utils";

export class TaxCalcIEBasic extends TaxCalcIE {
    constructor(
        salaryTaxRate: number,
        medicalFixInsurance: number,
        retirementFixInsurance: number
    ) {
        super(salaryTaxRate, medicalFixInsurance, retirementFixInsurance);
    }
    static burden(totalTax: number, income: number) {
        return Math.round((totalTax / income!) * 100);
    }
    // НДС
    static vat(income: number, expenses: number, salary: number) {
        const vatAccrued = Math.round((income * 20) / 120);
        const vatRecoupment = Math.round(((expenses - salary) * 20) / 120);
        const vat = vatAccrued - vatRecoupment;
        const vatFinal = vat >= 0 ? vat : 0;
        return { vatAccrued, vatRecoupment, vatFinal };
    }

    static totalInsuranceIEBasic(
        income: number,
        expenses: number,
        salary: number,
        retirementFixInsurance: number,
        medicalFixInsurance: number,
        vatTax: number
    ): number[] {
        const accident = salary * StaticRates.accident;
        const social = salary * BasicRates.social;
        const medical = salary * BasicRates.medical;
        const retirement = salary * BasicRates.retirement;
        const salaryTax = accident + social + medical + retirement;
        const limit = 300000;
        const test =
            income -
            expenses -
            accident -
            social -
            medical -
            retirement -
            retirementFixInsurance -
            medicalFixInsurance -
            limit -
            vatTax;

        const float = test / 101;

        const floatFinal = float >= 0 ? float : 0;

        const total = floatFinal + medicalFixInsurance + retirementFixInsurance;
        return [total, salaryTax];
    }
    // Подоходный налог
    static pit(
        income: number,
        expenses: number,
        salary: number,
        retirementFixInsurance: number,
        medicalFixInsurance: number,
        vatTax: number
    ) {
        const { vatAccrued, vatRecoupment } = this.vat(
            income,
            expenses,
            salary
        );

        const [totalInsurance, salaryTax] = this.totalInsuranceIEBasic(
            income!,
            expenses,
            salary,
            retirementFixInsurance!,
            medicalFixInsurance!,
            vatTax!
        );

        const taxIncome = income - vatAccrued;
        const taxRecoupment =
            expenses - vatRecoupment + salaryTax + totalInsurance;
        const pit =
            taxIncome - taxRecoupment > 0
                ? Math.round(((taxIncome - taxRecoupment) * 13) / 100)
                : 0;
        return { taxIncome, taxRecoupment, pit, totalInsurance, salaryTax };
    }

    // Итого налоги
    static totalTax({
        income,
        salary,
        expenses,
        retirementFixInsurance,
        medicalFixInsurance,
    }: calcData) {
        const { vatAccrued, vatRecoupment, vatFinal } = this.vat(
            income!,
            expenses!,
            salary!
        );
        const { taxIncome, taxRecoupment, pit, totalInsurance, salaryTax } =
            this.pit(
                income!,
                expenses!,
                salary!,
                retirementFixInsurance!,
                medicalFixInsurance!,
                vatFinal!
            );

        const total = pit + vatFinal + totalInsurance + salaryTax;
        const burden = income! > 0 ? this.burden(total, income!) : 0;
        return {
            vatAccruedCommonIE: vatAccrued,
            vatRecoupmentCommonIE: vatRecoupment,
            vatFinalCommonIE: vatFinal,
            taxIncomeCommonIE: taxIncome,
            taxRecoupmentCommonIE: taxRecoupment,
            pitCommonIE: pit,
            totalCommonIE: total,
            burdenCommonIE: burden,
        };
    }
}
