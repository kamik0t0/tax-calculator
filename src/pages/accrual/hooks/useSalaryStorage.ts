import { useLocalStorage } from "@customhooks/useLocalStorage";
import { useTypedSelector } from "@reduxhooks/hooks";
import {
    calcSummary,
    setSalariesToStorage,
    updateSalaries,
} from "@salarystore/salary-reducer";
import { ISalaryStorage } from "../exports/interfaces";
import { Months } from "../exports/utils";

export const useSalaryStorage = (): ISalaryStorage => {
    const { months, employees } = useTypedSelector(
        (state) => state.salarySlice
    );
    const Jan = useLocalStorage(
        Months.jan,
        months.jan.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Feb = useLocalStorage(
        Months.feb,
        months.feb.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const March = useLocalStorage(
        Months.march,
        months.march.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const April = useLocalStorage(
        Months.april,
        months.april.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const May = useLocalStorage(
        Months.may,
        months.may.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const June = useLocalStorage(
        Months.june,
        months.june.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const July = useLocalStorage(
        Months.july,
        months.july.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Aug = useLocalStorage(
        Months.aug,
        months.aug.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Sep = useLocalStorage(
        Months.sep,
        months.sep.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Oct = useLocalStorage(
        Months.oct,
        months.oct.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Nov = useLocalStorage(
        Months.nov,
        months.nov.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );

    const Dec = useLocalStorage(
        Months.dec,
        months.dec.salary,
        updateSalaries,
        setSalariesToStorage,
        calcSummary
    );
    const salaryStorageData: ISalaryStorage = {
        jan: Jan || months.jan,
        feb: Feb || months.feb,
        march: March || months.march,
        april: April || months.april,
        may: May || months.may,
        june: June || months.june,
        july: July || months.july,
        aug: Aug || months.aug,
        sep: Sep || months.sep,
        oct: Oct || months.oct,
        nov: Nov || months.nov,
        dec: Dec || months.dec,
    };
    return salaryStorageData;
};
