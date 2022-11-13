import { IncomeExpenses } from "./IncomeExpenses";
import { IEIncome } from "./IEIncome";

export class IEExpenses extends IEIncome {
    public readonly ieExpenses: IncomeExpenses;
    private readonly _expenses: number;

    constructor(
        income: number,
        expenses: number,
        salary: number,
        taxRate: number
    ) {
        super(income, salary, taxRate);
        this._expenses = expenses;
        this.ieExpenses = new IncomeExpenses(
            income,
            this._expenses,
            taxRate,
            this.totalInsurance
        );
    }

    // Расходы
    public get totalCost(): number {
        return this.ieExpenses.totalCost;
    }
    // минимальный налог
    public get minimal(): number {
        return this.ieExpenses.minimal;
    }
    // УСН
    public get usn(): number {
        return this.ieExpenses.usn;
    }
    // Итого налогов
    public get totalTax(): number {
        return this.ieExpenses.totalTax;
    }
}
