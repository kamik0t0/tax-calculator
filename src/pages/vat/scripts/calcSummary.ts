import { IInvoice, IInvoices } from "../exports/interfaces";

export const calcSummary = (state: IInvoices, table: IInvoice[]) => {
    const summ = table.reduce((acc, current) => acc + +current.summ, 0);
    const nds = table.reduce((acc, current) => acc + +current.nds, 0);
    const calculatedNDS =
        state.summary.sales.nds +
        state.summary.recieved.nds -
        state.summary.purches.nds -
        state.summary.issued.nds;
    const finalNDS = calculatedNDS < 0 ? 0 : calculatedNDS;
    return [summ, nds, finalNDS];
};
