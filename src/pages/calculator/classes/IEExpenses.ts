import { IEIncome } from "./IEIncome";

export class IEExpenses extends IEIncome {
    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, expenses, salary, taxRate);
    }
    // Расходы
    get totalCost() {
        return this.expenses + this.totalInsurance;
    }
    // минимальный налог
    get minimal() {
        return this.income * 0.01;
    }
    // УСН
    get usn() {
        const usn = Math.round((this.income - this.totalCost) * this.taxRate);
        return usn > this.minimal ? usn : this.minimal;
    }
}
