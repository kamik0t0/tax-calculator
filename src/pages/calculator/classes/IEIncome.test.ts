import { IEIncome } from "./IEIncome";

describe("IE Income", () => {
    test("Regular", () => {
        const calcIncomeIE = new IEIncome(450000, 60000, 0.06);
        const total = calcIncomeIE.totalTax;
        const burden = calcIncomeIE.burden(total);
        const tax = calcIncomeIE.usn;
        const recoupment = calcIncomeIE.recoupment;
        expect(total).toBe(76331);
        expect(burden).toBe(0.1696);
        expect(tax).toBe(13500);
        expect(recoupment).toBe(13500);
    });
    test("Zero income", () => {
        const calcIncomeIE = new IEIncome(0, 0, 0.06);
        const total = calcIncomeIE.totalTax;
        const burden = calcIncomeIE.burden(total);
        const tax = calcIncomeIE.usn;
        const recoupment = calcIncomeIE.recoupment;
        expect(total).toBe(43211);
        expect(burden).toBe(0);
        expect(tax).toBe(0);
        expect(recoupment).toBe(0);
    });
});
