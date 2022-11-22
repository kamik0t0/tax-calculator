import { useLocalStorage } from "@customhooks/useLocalStorage";
import {
    calcSummary,
    setLocalStorage,
    updateInvoices,
} from "@invoicesstore/invoice-reducer";
import { useTypedSelector } from "@reduxhooks/hooks";
import { IInvoiceStorage } from "../exports/interfaces";
import { Invoices } from "../exports/utils";

export const useInvoiceStorage = (): IInvoiceStorage => {
    const { sales, purches, recieved, issued } = useTypedSelector(
        (state) => state.invoiceSlice
    );
    const watchedSales = useLocalStorage(
        Invoices.Sale,
        sales,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );

    const watchedPurches = useLocalStorage(
        Invoices.Purchase,
        purches,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );
    const watchedRecieved = useLocalStorage(
        Invoices.Received,
        recieved,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );
    const watchedIssued = useLocalStorage(
        Invoices.Issued,
        issued,
        updateInvoices,
        calcSummary,
        setLocalStorage
    );
    const storage: IInvoiceStorage = {
        sales: watchedSales || sales,
        purches: watchedPurches || purches,
        recieved: watchedRecieved || recieved,
        issued: watchedIssued || issued,
    };
    return storage;
};
