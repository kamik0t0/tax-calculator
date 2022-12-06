import { useSnack } from "@customhooks/useSnack";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateSalary } from "@salarystore/salary-reducer";
import { ISalary } from "../exports/interfaces";
import { Months } from "../utils/months";

export const useSalaryData = (salary: ISalary[], table: Months) => {
    const dispatch = useTypedDispatch();
    const showSnack = useSnack();
    const getInputData = (
        value: string | number,
        index: number,
        prop: string
    ) => {
        if (salary[index].employeeId.length === 0)
            return showSnack(
                "warning",
                "Выберите сотрудника либо удалите строку"
            );
        showSnack("warning", "Не забудьте пересчитать взносы");
        dispatch(updateSalary(value, table, index.toString(), prop));
    };
    return getInputData;
};
