import { useSnack } from "@customhooks/useSnack";
import { toRU } from "@helpers/currencyFormat";
import {
    updateInvoiceClient,
    updateInvoiceDate,
    updateInvoiceNDS,
    updateInvoiceNum,
    updateInvoiceRate,
    updateInvoiceSumm,
} from "@invoicesstore/invoice-reducer";
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

        dispatch(updateInvoiceNDS(value as number, table, index));
    };

    const getDate = (date: number, index: number) => {
        const Year = new Date().getFullYear();
        const userYear = new Date(date).getFullYear();
        if (userYear !== Year)
            return showSnack(
                "warning",
                `Допустима дата в рамках текущего года - ${Year}`
            );

        dispatch(updateInvoiceDate(date, table, index));
    };

    const getRate = (rate: number | string, index: number) =>
        dispatch(updateInvoiceRate(rate as number, table, index));
    const getSumm = (summ: number | string, index: number) =>
        dispatch(updateInvoiceSumm(summ as number, table, index));
    const getNum = (num: number | string, index: number) =>
        dispatch(updateInvoiceNum(num as string, table, index));
    const getClient = (client: number | string, index: number) =>
        dispatch(updateInvoiceClient(client as string, table, index));

    return { getNDS, getDate, getRate, getSumm, getNum, getClient };
};
