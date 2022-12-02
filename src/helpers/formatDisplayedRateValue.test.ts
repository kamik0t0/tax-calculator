import { formatDisplayedRateValue } from "./formatDisplayedRateValue";

describe("Format displayed rate value", () => {
    test("Format rate value 20%", () => {
        expect(formatDisplayedRateValue(0.2)).toMatch("20,00");
    });
    test("Format rate value 10%", () => {
        expect(formatDisplayedRateValue(0.1)).toMatch("10,00");
    });
    test("Format rate value 0%", () => {
        expect(formatDisplayedRateValue(0)).toMatch("0,00");
    });
    test("Format rate value -1", () => {
        expect(formatDisplayedRateValue(-1)).toMatch("mix");
    });
});
