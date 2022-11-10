import { IncomeExpenses } from "../exports/classes";
import { LLCIncome } from "./LLCIncome";

export class LLCExpenses extends LLCIncome {
    protected _incomeExpenses: IncomeExpenses;

    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, expenses, salary, taxRate);
        this._incomeExpenses = new IncomeExpenses(
            income,
            expenses,
            salary,
            taxRate,
            this.salaryTax
        );
    }
    get llcExpensesData() {
        return this._incomeExpenses;
    }
}
