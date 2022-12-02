import { useLocalStorage } from "@customhooks/useLocalStorage";
import { useTypedSelector } from "@reduxhooks/hooks";
import { setEmployees } from "@salarystore/salary-reducer";
import { IEmployeeStorage } from "../exports/interfaces";

export const useEmployeeStorage = (): IEmployeeStorage => {
    const { employees } = useTypedSelector((state) => state.salarySlice);

    const watchedEmployees = useLocalStorage(
        "employees",
        employees,
        setEmployees
    );
    const employeeStorageData: IEmployeeStorage = {
        employees: watchedEmployees || employees,
    };
    return employeeStorageData;
};
