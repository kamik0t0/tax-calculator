import { useSnack } from "@customhooks/useSnack";
import {
    setEmployeeId,
    setIsDialogEmployee,
    setIsDialogEmployeeDelete,
    setIsDialogReportEmployee,
} from "@dialogstore/dialog-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { useEmployeeSelectors } from "../exports/hooks";

export const useEmployeeDialogActions = () => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();
    const { employeeId } = useTypedSelector((state) => state.dialogSlice);
    const { selectEmployeeById } = useEmployeeSelectors();
    const employee = selectEmployeeById(employeeId);

    const openEmployee = () => {
        dispatch(setEmployeeId(""));
        dispatch(setIsDialogEmployee(true));
    };
    const editEmployee = () => {
        if (employee !== undefined) {
            dispatch(setIsDialogEmployee(true));
        } else showSnack("warning", "Сотрудник не выбран");
    };
    const deleteEmployeeHandler = () => {
        if (employee !== undefined) {
            dispatch(setIsDialogEmployeeDelete(true));
        } else showSnack("warning", "Сотрудник не выбран");
    };
    const reportEmployeeHandler = () => {
        if (employee !== undefined) {
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
