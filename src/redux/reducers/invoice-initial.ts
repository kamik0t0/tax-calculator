import { IInvoices } from "../../interfaces/IInvoice";

export const initialState: IInvoices = {
    sales: [],
    purches: [],
    issued: [],
    recieved: [],
    summary: {
        purches: {
            summ: 0,
            nds: 0,
        },
        sales: {
            summ: 0,
            nds: 0,
        },
        issued: {
            summ: 0,
            nds: 0,
        },
        recieved: {
            summ: 0,
            nds: 0,
        },
        nds: 0,
    },
};
