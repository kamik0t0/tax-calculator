import { IMonths, ISalary } from "../types/salary";
import { fillByPrevMonth } from "./fillByPrevMonth";
import { initialState } from "../slice/salary-initial";
import { Months } from "../utils/months";

const months: IMonths = initialState.months;
months.feb.salary.push({
    id: "1w34",
    employeeId: "4328jf",
    name: "Ziyan D",
    pay: 3,
    accrued: 34,
    cumulativeAccrual: 933,
    overSocialLimit: 1,
    overRetirmentLimit: 3,
    insuranceRetirementBase: 34,
    insuranceSocialBase: 34,
    childrenQtty: 0,
    tax: 4,
    insurance: { retirement: 2, medical: 3, social: 4, accident: 1 },
    insuranceTotal: 3,
    checked: true,
    civilContract: true,
});
months.feb.salary.push({
    id: "1w34",
    employeeId: "4328jf",
    name: "Vas D",
    pay: 3,
    accrued: 34,
    cumulativeAccrual: 933,
    overSocialLimit: 1,
    overRetirmentLimit: 3,
    insuranceRetirementBase: 34,
    insuranceSocialBase: 34,
    childrenQtty: 0,
    tax: 4,
    insurance: { retirement: 2, medical: 3, social: 4, accident: 1 },
    insuranceTotal: 3,
    checked: true,
    civilContract: true,
});

const nextMonth: ISalary[] = [
    {
        id: "1w342",
        employeeId: "4328jf",
        name: "Ziyan D",
        pay: 3,
        accrued: 34,
        cumulativeAccrual: 933,
        overSocialLimit: 1,
        overRetirmentLimit: 3,
        insuranceRetirementBase: 34,
        insuranceSocialBase: 34,
        childrenQtty: 0,
        tax: 4,
        insurance: { retirement: 2, medical: 3, social: 4, accident: 1 },
        insuranceTotal: 3,
        checked: true,
        civilContract: true,
    },
    {
        id: "1w345",
        employeeId: "4328jf",
        name: "Vas D",
        pay: 56,
        accrued: 35,
        cumulativeAccrual: 933,
        overSocialLimit: 1,
        overRetirmentLimit: 3,
        insuranceRetirementBase: 34,
        insuranceSocialBase: 34,
        childrenQtty: 0,
        tax: 4,
        insurance: { retirement: 2, medical: 3, social: 4, accident: 1 },
        insuranceTotal: 3,
        checked: true,
        civilContract: true,
    },
];

describe("Fill By Prev Month", () => {
    const [keys_0, keys_1] = nextMonth.map((arr) => Object.keys(arr));
    const res = fillByPrevMonth(months, Months.march);
    const [resKeys_0, resKeys_1] = res.map((arr) => Object.keys(arr));
    /**
     * Проверяется наличие всех свойств
     */
    test("Props keys equality", () => {
        expect(keys_0).toEqual(resKeys_0);
        expect(keys_1).toEqual(resKeys_1);
    });
    /**
     * Проверяются выборочные свойства и их значения
     */
    test("Props? value equality", () => {
        expect(nextMonth[0]).toHaveProperty(resKeys_0[2], "Ziyan D");
        expect(nextMonth[0]).toHaveProperty(resKeys_0[3], 3);
        expect(nextMonth[0]).toHaveProperty(resKeys_0[4], 34);
        expect(nextMonth[1]).toHaveProperty(resKeys_1[2], "Vas D");
        expect(nextMonth[1]).toHaveProperty(resKeys_1[3], 56);
        expect(nextMonth[1]).toHaveProperty(resKeys_1[4], 35);
    });
});
