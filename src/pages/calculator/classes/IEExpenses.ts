import { IncomeExpenses } from "./IncomeExpenses";
import { IEIncome } from "./IEIncome";

export class IEExpenses extends IEIncome {
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
            this.totalInsurance
        );
    }
    get ieExpensesData() {
        return this._incomeExpenses;
    }
}
