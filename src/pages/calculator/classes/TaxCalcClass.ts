export class TaxCalc {
    salaryTaxRate: number;
    constructor(salaryTaxRate = 30.2) {
        this.salaryTaxRate = salaryTaxRate;
    }

    // Налоги с зарплаты
    static salaryTax(salary: number, salaryTaxRate: number) {
        return Math.round((salary! * salaryTaxRate!) / 100);
    }
}
