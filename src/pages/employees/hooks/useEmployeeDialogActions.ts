import { useSnack } from "@customhooks/useSnack";
import {
    setEmployeeId,
    setIsDialogEmployee,
    setIsDialogEmployeeDelete,
    setIsDialogReportEmployee,
} from "@dialogstore/dialog-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { useState } from "react";
import { useEmployeeSelectors } from "../exports/hooks";

export const useEmployeeDialogActions = () => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();
    const { employeeId } = useTypedSelector((state) => state.dialogSlice);
    const { selectEmployeeById } = useEmployeeSelectors();
    const employee = selectEmployeeById(employeeId);

    const [DeleteEmployeeDialog, setDeleteEmployeeDialog] =
        useState<React.FC | null>(null);
    const [EmployeeDialog, setEmployeeDialog] = useState<React.FC | null>(null);
    const [EmployeeReportDialog, setEmployeeReportDialog] =
        useState<React.FC | null>(null);

    const openEmployee = async () => {
        const { default: EmployeeDialog } = await import(
            "../components/EmployeeDialog/EmployeeDialog"
        );
        dispatch(setEmployeeId(""));
        dispatch(setIsDialogEmployee(true));
        setEmployeeDialog(() => EmployeeDialog);
    };
    const editEmployee = async () => {
        const { default: EmployeeDialog } = await import(
            "../components/EmployeeDialog/EmployeeDialog"
        );
        if (employee !== undefined) {
            dispatch(setIsDialogEmployee(true));
            setEmployeeDialog(() => EmployeeDialog);
        } else showSnack("warning", "Сотрудник не выбран");
    };
    const deleteEmployeeHandler = async () => {
        const { default: DeleteEmployeeDialog } = await import(
            "../components/DeleteEmployeeDialog"
        );
        if (employee !== undefined) {
            dispatch(setIsDialogEmployeeDelete(true));
            setDeleteEmployeeDialog(() => DeleteEmployeeDialog);
        } else showSnack("warning", "Сотрудник не выбран");
    };
    const reportEmployeeHandler = async () => {
        const { default: EmployeeReportDialog } = await import(
            "../components/EmployeeReportDialog"
        );
        if (employee !== undefined) {
            dispatch(setIsDialogReportEmployee(true));
            setEmployeeReportDialog(() => EmployeeReportDialog);
        } else showSnack("warning", "Сотрудник не выбран");
    };
    return {
        openEmployee,
        editEmployee,
        deleteEmployeeHandler,
        reportEmployeeHandler,
        DeleteEmployeeDialog,
        EmployeeDialog,
        EmployeeReportDialog,
    };
};
