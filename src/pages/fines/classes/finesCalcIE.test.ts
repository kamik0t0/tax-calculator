import { FinesCalcIE } from "./finesCalcIE";

describe("Calculate IE fines", () => {
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2017-10-01").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(458.27);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2017-09-30").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(459.68);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2017-09-29").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(461.1);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2017-09-28").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(462.52);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2017-10-06").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(2318.76);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2022-03-09").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(527.23);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2022-03-08").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(530.56);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2022-02-05").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(594.86);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2022-03-01").getTime(),
            new Date("2022-12-01").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(516.39);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2021-12-20").getTime(),
            new Date("2022-12-31").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(661.45);
    });
    test("", () => {
        const finesData = new FinesCalcIE(
            5000,
            new Date("2017-09-30").getTime(),
            new Date("2018-09-28").getTime()
        );
        const finesArr = finesData.finesArr();
        const fines = finesData.calcFines(finesArr);
        expect(fines).toBe(459.68);
    });
});
