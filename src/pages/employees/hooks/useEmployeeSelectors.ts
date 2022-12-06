import { employeeSelectors } from "../slice/employee-reducer";
import { useTypedSelector } from "@reduxhooks/hooks";
import { store } from "@store/store";

export const useEmployeeSelectors = () => {
    const selectEmployees = () => useTypedSelector(employeeSelectors.selectAll);

    const selectEmployeeById = (id: string = "") =>
        employeeSelectors.selectById(store.getState(), id);

    const selectIds = () => useTypedSelector(employeeSelectors.selectIds);

    return { selectEmployees, selectEmployeeById, selectIds };
};
