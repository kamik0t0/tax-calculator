import { IncomeExpenses } from "../exports/classes";
import { LLCIncome } from "./LLCIncome";

export class LLCExpenses extends LLCIncome {
    public readonly llcExpenses: IncomeExpenses;
    private readonly _expenses: number;

    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, salary, taxRate);
        this._expenses = expenses;
        this.llcExpenses = new IncomeExpenses(
            income,
            this._expenses,
            taxRate,
            this.salaryTax
        );
    }
    // Расходы
    public get totalCost(): number {
        return this.llcExpenses.totalCost;
    }
    // минимальный налог
    public get minimal(): number {
        return this.llcExpenses.minimal;
    }
    // УСН
    public get usn(): number {
        return this.llcExpenses.usn;
    }
    // Итого налогов
    public get totalTax(): number {
        return this.llcExpenses.totalTax;
    }
}
