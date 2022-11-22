import { IInvoice, IInvoices } from "../exports/interfaces";

export const calcSummary = (
    state: IInvoices,
    summary: { summ: number; nds: number },
    table: IInvoice[]
) => {
    if (table) {
        summary.summ = table.reduce((acc, current) => acc + +current.summ, 0);
        summary.nds = table.reduce((acc, current) => acc + +current.nds, 0);
    }

    state.summary.nds =
        state.summary.sales.nds +
        state.summary.recieved.nds -
        state.summary.purches.nds -
        state.summary.issued.nds;
    if (state.summary.nds < 0) state.summary.nds = 0;
};
