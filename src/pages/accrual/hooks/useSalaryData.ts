import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateSalary } from "@salarystore/salary-reducer";
import { showSuccessSnackBar } from "@uistore/ui-reducer";
import { ISalary } from "../exports/interfaces";

export const useSalaryData = (salary: ISalary[], table: string) => {
    const dispatch = useTypedDispatch();
    const getInputData = (
        value: string | number,
        index: number,
        prop: string
    ) => {
        if (salary[index].employeeId.length === 0)
            return dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: "Выберите сотрудника либо удалите строку",
                })
            );
        dispatch(
            showSuccessSnackBar({
                open: true,
                severity: "warning",
                message: "Не забудьте пересчитать взносы",
            })
        );
        dispatch(updateSalary(value, table, index.toString(), prop));
    };
    return getInputData;
};
