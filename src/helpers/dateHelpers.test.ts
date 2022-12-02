import * as helpers from "./dateHelpers";

describe("is date interval correct", () => {
    test("interval correct", () => {
        expect(helpers.isDateInteravalCorrect(100, 200)).toBe(true);
    });
    test("interval incorrect", () => {
        expect(helpers.isDateInteravalCorrect(300, 200)).toBe(false);
    });
    test("interval correct", () => {
        expect(helpers.isDateInteravalCorrect(200, 200)).toBe(true);
    });
});

describe("Timestamp to string", () => {
    test("Return string date 2022-11-28", () => {
        expect(helpers.stampToStr(1669658925633)).toBe("2022-11-28");
    });
});

describe("Timestamp to native locale string", () => {
    test("Return string date 28.11.2022", () => {
        expect(helpers.timestampToNativeToLocaleString(1669658925633)).toBe(
            "28.11.2022"
        );
    });
});

describe("Default date to local RU", () => {
    test("Return string date 28.11.2022", () => {
        expect(helpers.defaultDateToLocalRU("2022-11-28")).toBe("28.11.2022");
    });
});

describe("Make default date", () => {
    test("Return string date 2022-11-28", () => {
        expect(helpers.makeDefaultDate(1669658925633)).toBe("2022-11-28");
    });
    test("Return string date 2022-07-14", () => {
        expect(helpers.makeDefaultDate(1657756800000)).toBe("2022-07-14");
    });
    test("Return string date 2022-07-05", () => {
        expect(helpers.makeDefaultDate(1656979200000)).toBe("2022-07-05");
    });
});
