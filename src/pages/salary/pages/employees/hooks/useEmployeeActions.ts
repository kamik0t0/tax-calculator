import {
    setIsDialogEmployee,
    setIsDialogEmployeeDelete,
    setIsDialogReportEmployee,
} from "@dialogstore/dialog-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { setEmployeeById } from "@salarystore/salary-reducer";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
export const useEmployeeActions = () => {
    const dispatch = useTypedDispatch();
    const { employee } = useTypedSelector((state) => state.salarySlice);
    const openEmployee = () => {
        dispatch(setEmployeeById(""));
        dispatch(setIsDialogEmployee(true));
    };
    const editEmployee = () => {
        if (employee.id !== "") {
            dispatch(setIsDialogEmployee(true));
        } else {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Сотрудник не выбран",
                })
            );
            return;
        }
    };
    const deleteEmployeeHandler = () => {
        if (employee.id !== "") {
            dispatch(setIsDialogEmployeeDelete(true));
        } else {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Сотрудник не выбран",
                })
            );
            return;
        }
    };
    const reportEmployeeHandler = () => {
        if (employee.id !== "") {
            dispatch(setIsDialogReportEmployee(true));
        } else {
            dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Сотрудник не выбран",
                })
            );
            return;
        }
    };
    return {
        openEmployee,
        editEmployee,
        deleteEmployeeHandler,
        reportEmployeeHandler,
    };
};
