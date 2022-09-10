import { ISalaries } from "../../../pages/salary-tax/interfaces/ISalary";
import { BasicRates } from "../../../pages/salary-tax/utils/salaryConsts";

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
    rateCode: BasicRates.code as string,
};
