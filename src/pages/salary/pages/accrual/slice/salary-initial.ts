import { ISalaries } from "../exports/interfaces";
import { BasicRates } from "../exports/utils";

export const initialState: ISalaries = {
    months: {
        jan: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        feb: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        march: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        april: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        may: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        june: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        july: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        aug: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        sep: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        oct: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        nov: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
        dec: {
            salary: [],
            summary: {
                accruedTotal: 0,
                taxTotal: 0,
                insuranceTotal: 0,
                payTotal: 0,
            },
        },
    },
    employees: [],
    employee: {
        id: "",
        name: "",
        surname: "",
        position: "",
        birth: "",
        sex: "",
        patronymic: "",
    },
    rateCode: BasicRates.code as string,
    districtCoeff: 1,
    minimalSalary: 0,
};
