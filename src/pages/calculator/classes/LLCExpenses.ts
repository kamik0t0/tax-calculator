import { LLCIncome } from "./LLCIncome";

export class LLCExpenses extends LLCIncome {
    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, expenses, salary, taxRate);
    }

    // минимальный налог
    get minimal() {
        return this.income * 0.01;
    }
    // Расходы
    get totalCost() {
        return this.expenses + this.salaryTax;
    }
    // УСН начислен 2.1
    get usn() {
        const usn = Math.round((this.income - this.totalCost) * this.taxRate);
        return usn > this.minimal ? usn : this.minimal;
    }
}
