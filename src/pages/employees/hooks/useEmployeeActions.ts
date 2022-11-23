import { useSnack } from "@customhooks/useSnack";
import {
    setIsDialogEmployee,
    setIsDialogEmployeeDelete,
    setIsDialogReportEmployee,
} from "@dialogstore/dialog-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { setEmployeeById } from "@salarystore/salary-reducer";

export const useEmployeeActions = () => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();
    const { employee } = useTypedSelector((state) => state.salarySlice);
    const openEmployee = () => {
        dispatch(setEmployeeById(""));
        dispatch(setIsDialogEmployee(true));
    };
    const editEmployee = () => {
        if (employee.id !== "") {
            dispatch(setIsDialogEmployee(true));
        } else showSnack("warning", "Сотрудник не выбран");
    };
    const deleteEmployeeHandler = () => {
        if (employee.id !== "") {
            dispatch(setIsDialogEmployeeDelete(true));
        } else showSnack("warning", "Сотрудник не выбран");
    };
    const reportEmployeeHandler = () => {
        if (employee.id !== "") {
            dispatch(setIsDialogReportEmployee(true));
        } else showSnack("warning", "Сотрудник не выбран");
    };
    return {
        openEmployee,
        editEmployee,
        deleteEmployeeHandler,
        reportEmployeeHandler,
    };
};
