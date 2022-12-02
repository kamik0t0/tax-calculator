import { FinesCalcLLC } from "./finesCalcLLC";

describe("Calculate LLC fines", () => {
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2017-10-01").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(874.13);
        expect(days).toBe(362);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2017-09-30").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(876.92);
        expect(days).toBe(363);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2017-09-29").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(461.1);
        expect(days).toBe(364);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2017-09-28").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(462.52);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2017-10-06").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(4064.13);
        expect(days).toBe(1912);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2022-03-09").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(527.23);
        expect(days).toBe(297);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2022-03-08").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(530.56);
        expect(days).toBe(298);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2022-02-05").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(597.51);
        expect(days).toBe(329);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2022-03-01").getTime(),
            new Date("2022-12-01").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(516.39);
        expect(days).toBe(275);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2021-12-20").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(749.13);
        expect(days).toBe(376);
    });
    test("", () => {
        const finesData = new FinesCalcLLC(
            5000,
            new Date("2017-09-30").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        const days = finesData.calcDays(finesArr);
        expect(fines).toBe(876.92);
        expect(days).toBe(363);
    });
});
