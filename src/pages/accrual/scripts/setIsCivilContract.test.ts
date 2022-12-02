import { IEmployee } from "../exports/interfaces";
import { setIsCivilContract } from "./setIsCivilContract";

export const mockEmployees: Pick<IEmployee, "civilContract" | "id">[] = [
    {
        id: "VNfosE",
        civilContract: true,
    },
    {
        id: "j_KWa4",
        civilContract: true,
    },
    {
        id: "3",
        civilContract: false,
    },
];

describe("is Civil Contract", () => {
    test("isCivilContract", () => {
        expect(setIsCivilContract(mockEmployees, "j_KWa4")).toBe(true);
    });
    test("notIsCivilContract", () => {
        expect(setIsCivilContract(mockEmployees, "3")).toBe(false);
    });
});
