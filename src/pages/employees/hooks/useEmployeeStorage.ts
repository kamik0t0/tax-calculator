import { useLocalStorage } from "@customhooks/useLocalStorageTest";
import { setEmployees } from "@employeestore/employee-reducer";
import { IEmployee } from "../exports/types";
import { useEmployeeSelectors } from "./useEmployeeSelectors";

export const useEmployeeStorage = (): IEmployee[] => {
    const { selectEmployees } = useEmployeeSelectors();
    const employees = selectEmployees();

    const watchedEmployees = useLocalStorage(
        "employees",
        employees,
        setEmployees
    );

    return watchedEmployees;
};
