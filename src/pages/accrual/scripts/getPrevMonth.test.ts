import { getPrevMonth } from "./getPrevMonth";
import { Months, months } from "../exports/utils";

describe("getPrevMonth", () => {
    test("January Test", () => {
        expect(getPrevMonth(Months.jan, months)).toBe(null);
    });
    test("Feb Test", () => {
        expect(getPrevMonth(Months.feb, months)).toBe(Months.jan);
    });
    test("March Test", () => {
        expect(getPrevMonth(Months.march, months)).toBe(Months.feb);
    });
    test("April Test", () => {
        expect(getPrevMonth(Months.april, months)).toBe(Months.march);
    });
    test("May Test", () => {
        expect(getPrevMonth(Months.may, months)).toBe(Months.april);
    });
    test("June Test", () => {
        expect(getPrevMonth(Months.june, months)).toBe(Months.may);
    });
    test("July Test", () => {
        expect(getPrevMonth(Months.july, months)).toBe(Months.june);
    });
    test("August Test", () => {
        expect(getPrevMonth(Months.aug, months)).toBe(Months.july);
    });
    test("September Test", () => {
        expect(getPrevMonth(Months.sep, months)).toBe(Months.aug);
    });
    test("October Test", () => {
        expect(getPrevMonth(Months.oct, months)).toBe(Months.sep);
    });
    test("November Test", () => {
        expect(getPrevMonth(Months.nov, months)).toBe(Months.oct);
    });
    test("December Test", () => {
        expect(getPrevMonth(Months.dec, months)).toBe(Months.nov);
    });
});
