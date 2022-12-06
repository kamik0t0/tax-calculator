import { store } from "@store/store";
import {
    addEmployee as add,
    updateEmployee as up,
    deleteEmployee as del,
} from "@employeestore/employee-reducer";
import { IEmployee } from "../exports/types";

export const useEmployeeActions = () => {
    const addEmployee = (employee: IEmployee = {} as IEmployee) => {
        store.dispatch(add(employee));
    };
    const updateEmployee = (id: string, employee: IEmployee) => {
        store.dispatch(up({ id, changes: employee }));
    };
    const deleteEmployee = (id: string = "") => {
        store.dispatch(del(id));
    };

    return { addEmployee, deleteEmployee, updateEmployee };
};
