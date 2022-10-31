import { calcData } from "../types/Itax";
import { TaxCalc, TaxCalcIE } from "./calc-constructor";

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
    static usnAccrued(income: number) {
        return Math.round((income! * 6) / 100);
    }
    // УСН
    static USN({
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
            const usn = this.usnAccrued(income!);
            if (usn - totalCost > usn / 2) return Math.round(usn - totalCost);
            else return Math.round(usn / 2);
        } else {
            let check =
                (income! * 6) / 100 -
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

export class TaxCalcLLCIncome extends TaxCalc {
    constructor(salaryTaxRate: number | undefined) {
        super(salaryTaxRate);
    }
    // УСН начислен 2.1
    static usnAccrued(income: number) {
        return Math.round((income! * 6) / 100);
    }
    // Налоговая нагрузка
    static burden(income: number, salaryTax: number, usn: number) {
        return Math.round(((salaryTax! + usn!) / income!) * 100);
    }
    // УСН к уплате 2
    static USN(income: number, salary: number, salaryTaxRate: number) {
        const salaryTax = this.salaryTax(salary!, salaryTaxRate!);

        if (salary! > 0) {
            let usn = Math.round((income! * 6) / 100);
            if (usn - salaryTax > (usn * 50) / 100) {
                return Math.round(usn - salaryTax);
            } else {
                return Math.round((usn * 50) / 100);
            }
        } else {
            let checkZeroIncome = (income! * 6) / 100;
            return Math.round(checkZeroIncome > 0 ? checkZeroIncome : 0);
        }
    }
    // Итого налоги
    static totalTax({ income, salary, salaryTaxRate }: calcData) {
        let total = 0;
        let burden = 0;
        if (income === 0 && salary === 0) return [total, burden, 0];

        const USN =
            income === 0 ? 0 : this.USN(income!, salary!, salaryTaxRate!);

        const salaryTax =
            salary === 0 ? 0 : this.salaryTax(salary!, salaryTaxRate!);

        total = Math.round(USN + salaryTax);

        if (income! > 0) burden = this.burden(income!, salaryTax, USN);

        return [total, burden, USN];
    }
}

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
    static usnMinimal({ income }: calcData) {
        return (income! * 1) / 100;
    }
    // УСН
    static USN({
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

        const usn = Math.round(((income! - totalCost!) * 15) / 100);
        const minimal = this.usnMinimal({ income });
        const usnFinal = usn > minimal ? usn : minimal;
        return [usnFinal, minimal];
    }

    // Итого налоги
    static totalTax({
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

export class TaxCalcLLCExpenses extends TaxCalc {
    constructor(salaryTaxRate: number | undefined) {
        super(salaryTaxRate);
    }
    // минимальный налог
    static usnMinimal({ income }: calcData) {
        return (income! * 1) / 100;
    }
    // Расходы
    static totalCost(salary: number, expenses: number, salaryTaxRate: number) {
        const salaryTax = this.salaryTax(salary, salaryTaxRate);
        return expenses! + salaryTax;
    }
    // УСН начислен 2.1
    static USN({ income, salary, expenses, salaryTaxRate }: calcData) {
        const totalCost = this.totalCost(salary!, expenses!, salaryTaxRate!);

        const usn = Math.round(((income! - totalCost!) * 15) / 100);
        const minimal = this.usnMinimal({ income });
        const usnFinal = usn > minimal ? usn : minimal;
        return [usnFinal, minimal];
    }
    // Налоговая нагрузка
    static burden(income: number, salaryTax: number, usn: number) {
        return Math.round(((salaryTax! + usn!) / income!) * 100);
    }
    // Итого налоги
    static totalTax({ income, salary, expenses, salaryTaxRate }: calcData) {
        let total = 0;
        let burden = 0;
        if (income === 0 && salary === 0) return [total, burden, 0, 0];

        const [USN, minimal] = this.USN({
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
    // Подоходный налог
    static pit(
        income: number,
        expenses: number,
        salary: number,
        retirementFixInsurance: number,
        medicalFixInsurance: number,
        salaryTaxRate: number
    ) {
        const { vatAccrued, vatRecoupment } = this.vat(
            income,
            expenses,
            salary
        );
        const salaryTax = this.salaryTax(salary, salaryTaxRate);
        const totalInsurance = this.totalInsurance(
            income!,
            retirementFixInsurance!,
            medicalFixInsurance!
        );
        const taxIncome = income - vatAccrued;
        const taxRcoupment =
            expenses - vatRecoupment + salaryTax + totalInsurance;
        const pit =
            taxIncome - taxRcoupment > 0
                ? Math.round(((taxIncome - taxRcoupment) * 13) / 100)
                : 0;
        return { taxIncome, taxRcoupment, pit, totalInsurance, salaryTax };
    }

    // Итого налоги
    static totalTax({
        income,
        salary,
        expenses,
        retirementFixInsurance,
        medicalFixInsurance,
        salaryTaxRate,
    }: calcData) {
        const { vatAccrued, vatRecoupment, vatFinal } = this.vat(
            income!,
            expenses!,
            salary!
        );
        const { taxIncome, taxRcoupment, pit, totalInsurance, salaryTax } =
            this.pit(
                income!,
                expenses!,
                salary!,
                retirementFixInsurance!,
                medicalFixInsurance!,
                salaryTaxRate!
            );

        const total = pit + vatFinal + totalInsurance + salaryTax;
        const burden = income! > 0 ? this.burden(total, income!) : 0;
        return {
            vatAccruedCommonIE: vatAccrued,
            vatRecoupmentCommonIE: vatRecoupment,
            vatFinalCommonIE: vatFinal,
            taxIncomeCommonIE: taxIncome,
            taxRcoupmentCommonIE: taxRcoupment,
            pitCommonIE: pit,
            totalCommonIE: total,
            burdenCommonIE: burden,
        };
    }
}
export class TaxCalcLLCBasic extends TaxCalc {
    constructor(salaryTaxRate: number) {
        super(salaryTaxRate);
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
    // Подоходный налог
    static pit(
        income: number,
        expenses: number,
        salary: number,
        salaryTaxRate: number
    ) {
        const { vatAccrued, vatRecoupment } = this.vat(
            income,
            expenses,
            salary
        );
        const salaryTax = this.salaryTax(salary, salaryTaxRate);

        const taxIncome = income - vatAccrued;
        const taxRcoupment = expenses - vatRecoupment + salaryTax;
        const pit = Math.round(((taxIncome - taxRcoupment) * 20) / 100);
        return { taxIncome, taxRcoupment, pit, salaryTax };
    }

    // Итого налоги
    static totalTax({ income, salary, expenses, salaryTaxRate }: calcData) {
        const { vatAccrued, vatRecoupment, vatFinal } = this.vat(
            income!,
            expenses!,
            salary!
        );
        const { taxIncome, taxRcoupment, pit, salaryTax } = this.pit(
            income!,
            expenses!,
            salary!,
            salaryTaxRate!
        );
        const total = pit + vatFinal + salaryTax;
        const burden = income! > 0 ? this.burden(total, income!) : 0;
        return {
            vatAccruedCommonLLC: vatAccrued,
            vatRecoupmentCommonLLC: vatRecoupment,
            vatFinalCommonLLC: vatFinal,
            taxIncomeCommonLLC: taxIncome,
            taxRcoupmentCommonLLC: taxRcoupment,
            pitCommonLLC: pit,
            totalCommonLLC: total,
            burdenCommonLLC: burden,
        };
    }
}
