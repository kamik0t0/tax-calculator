import { useSnack } from "@customhooks/useSnack";
import { toRU } from "@helpers/currencyFormat";
import { updateInvoice } from "@invoicesstore/invoice-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";

export const useInvoiceData = (table: string) => {
    const dispatch = useTypedDispatch();
    const VATSlice = useTypedSelector((state) => state.invoiceSlice);
    const showSnack = useSnack();

    const getNDS = (value: string | number, index: number) => {
        const nds = (VATSlice[table][index].summ * 20) / 120;
        const maxVAT = +nds.toFixed(2);
        if (+value > maxVAT)
            return showSnack(
                "warning",
                `НДС не может превышать 20% от суммы документа (${toRU.format(
                    maxVAT
                )}})`
            );

        dispatch(
            updateInvoice({
                value: value as number,
                table,
                index,
                prop: "nds",
            })
        );
    };
    const getDate = (date: number, index: number) => {
        const Year = new Date().getFullYear();
        const userYear = new Date(date).getFullYear();
        if (userYear !== Year)
            return showSnack(
                "warning",
                `Допустима дата в рамках текущего года - ${Year}`
            );

        dispatch(updateInvoice({ value: date, table, index, prop: "date" }));
    };
    const getRate = (rate: number | string, index: number) =>
        dispatch(
            updateInvoice({ value: rate as number, table, index, prop: "rate" })
        );
    const getSumm = (summ: number | string, index: number) =>
        dispatch(
            updateInvoice({ value: summ as number, table, index, prop: "summ" })
        );
    const getNum = (num: number | string, index: number) =>
        dispatch(
            updateInvoice({ value: num as string, table, index, prop: "num" })
        );
    const getClient = (client: number | string, index: number) =>
        dispatch(
            updateInvoice({
                value: client as string,
                table,
                index,
                prop: "client",
            })
        );

    return { getNDS, getDate, getRate, getSumm, getNum, getClient };
};
