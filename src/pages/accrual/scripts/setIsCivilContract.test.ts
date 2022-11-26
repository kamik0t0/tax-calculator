import { mockEmployees } from "../utils/mockData";
import { setIsCivilContract } from "./setIsCivilContract";

describe("is Civil Contract", () => {
    test("isCivilContract", () => {
        expect(setIsCivilContract(mockEmployees, "j_KWa4")).toBe(true);
    });
    test("notIsCivilContract", () => {
        expect(setIsCivilContract(mockEmployees, "3")).toBe(false);
    });
    test("notIsCivilContract", () => {
        expect(setIsCivilContract(mockEmployees, "VNfosE")).toBe(true);
    });
});
