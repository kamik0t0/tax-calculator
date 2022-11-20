import { useSort } from "@customhooks/useSort";
import { useTypedDispatch } from "@reduxhooks/hooks";
import { updateSalaries } from "@salarystore/salary-reducer";
import { ISalary } from "../exports/interfaces";
import { SalarySortFields } from "../exports/utils";

export const useTableHeader = (salary: ISalary[], table: string) => {
    const dispatch = useTypedDispatch();
    const { byNumber, byString, sortOrder } = useSort(salary);

    const sortByEmployee = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byString(SalarySortFields.employee), table));
    const sortByTax = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byNumber(SalarySortFields.tax), table));
    const sortByAccrued = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byNumber(SalarySortFields.accrued), table));
    const sortByRecoupment = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(
            updateSalaries(byNumber(SalarySortFields.childrenQtty), table)
        );
    const sortByInsurance = (event: React.MouseEvent<HTMLTableCellElement>) =>
        dispatch(updateSalaries(byNumber(SalarySortFields.insurance), table));
    return {
        sortByEmployee,
        sortByTax,
        sortByAccrued,
        sortByRecoupment,
        sortByInsurance,
        sortOrder,
    };
};
