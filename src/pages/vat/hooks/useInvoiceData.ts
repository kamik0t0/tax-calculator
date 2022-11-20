import { toRU } from "@helpers/currencyFormat";
import { updateInvoice } from "@invoicesstore/invoice-reducer";
import { useTypedDispatch, useTypedSelector } from "@reduxhooks/hooks";
import { showSuccessSnackBar } from "@uistore/ui-reducer";

export const useInvoiceData = (table: string) => {
    const dispatch = useTypedDispatch();
    const VATSlice = useTypedSelector((state) => state.invoiceSlice);
    // number | string
    const getInputData = (
        value: string | number,
        index: number,
        prop: string
    ) => {
        if (prop === "nds") {
            const maxVAT = (VATSlice[table][index].summ * 20) / 120;
            if (+value > maxVAT)
                return dispatch(
                    showSuccessSnackBar({
                        open: true,
                        severity: "warning",
                        message: `НДС не может превышать 20% от суммы документа (${toRU.format(
                            maxVAT
                        )}})`,
                    })
                );
        }
        dispatch(updateInvoice(value, table, index.toString(), prop));
    };
    // date
    const getDate = (date: number, index: number) => {
        const Year = new Date().getFullYear();
        const userYear = new Date(date).getFullYear();

        if (userYear !== Year) {
            return dispatch(
                showSuccessSnackBar({
                    open: true,
                    severity: "warning",
                    message: `Допустима дата в рамках текущего года - ${Year}`,
                })
            );
        }

        dispatch(updateInvoice(date, table, index.toString(), "date"));
    };
    // select
    const getRateValue = (rate: string, index: number) =>
        dispatch(updateInvoice(rate, table, index.toString(), "rate"));

    return [getInputData, getDate, getRateValue] as const;
};
