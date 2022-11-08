import { TaxCalc } from "../exports/classes";
import { calcData } from "../exports/types";

export class TaxCalcLLCBasic extends TaxCalc {
    constructor(salaryTaxRate: number) {
        super(salaryTaxRate);
    }
    static burden(totalTax: number, income: number) {
        return totalTax / income!;
    }
    // НДС
    static vat(income: number, expenses: number, salary: number) {
        const vatAccrued = Math.round((income * 20) / 120);
        const vatRecoupment = Math.round(((expenses - salary) * 20) / 120);
        const vat = vatAccrued - vatRecoupment;
        const vatFinal = vat >= 0 ? vat : 0;
        return { vatAccrued, vatRecoupment, vatFinal };
    }
    // Налог на прибыль
    static LLCIncomeTax(
        rate: number,
        income: number,
        expenses: number,
        salary: number,
        salaryTaxRate: number
    ) {
        const fedLLCTaxRate = 0.03;
        const { vatAccrued, vatRecoupment } = this.vat(
            income,
            expenses,
            salary
        );
        const salaryTax = this.salaryTax(salary, salaryTaxRate);

        const TotalLLCTaxRate = fedLLCTaxRate + rate;

        const taxIncome = income - vatAccrued;
        const taxRecoupment = expenses - vatRecoupment + salaryTax;
        const LLCIncomeTax = Math.round(
            (taxIncome - taxRecoupment) * TotalLLCTaxRate
        );

        return { taxIncome, taxRecoupment, LLCIncomeTax, salaryTax };
    }

    // Итого налоги
    static totalTax({
        rate,
        income,
        salary,
        expenses,
        salaryTaxRate,
    }: calcData) {
        const { vatAccrued, vatRecoupment, vatFinal } = this.vat(
            income!,
            expenses!,
            salary!
        );
        const { taxIncome, taxRecoupment, LLCIncomeTax, salaryTax } =
            this.LLCIncomeTax(
                rate,
                income!,
                expenses!,
                salary!,
                salaryTaxRate!
            );
        const total = LLCIncomeTax + vatFinal + salaryTax;
        const burden = income! > 0 ? this.burden(total, income!) : 0;
        return {
            vatAccruedCommonLLC: vatAccrued,
            vatRecoupmentCommonLLC: vatRecoupment,
            vatFinalCommonLLC: vatFinal,
            taxIncomeCommonLLC: taxIncome,
            taxRecoupmentCommonLLC: taxRecoupment,
            IncomeTaxCommonLLC: LLCIncomeTax,
            totalCommonLLC: total,
            burdenCommonLLC: burden,
        };
    }
}
