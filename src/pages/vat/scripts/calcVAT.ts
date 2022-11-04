import { IInvoices } from "../exports/interfaces";

export const calculateVAT = (state: IInvoices) => {
    state.summary.nds =
        state.summary.sales.nds +
        state.summary.recieved.nds -
        state.summary.purches.nds -
        state.summary.issued.nds;
    if (state.summary.nds < 0) state.summary.nds = 0;
};
