import { useEffect } from "react";
import { IInvoice } from "../interfaces/IInvoice";
import { useTypedDispatch, useTypedSelector } from "../redux/hooks/hooks";
import {
    updateInvoices,
    calcSummary,
    setLocalStorage,
} from "../redux/reducers/invoice-reducer";

export function useLocalStorage(key: string) {
    const dispatch = useTypedDispatch();
    const invoices: IInvoice[] = useTypedSelector(
        (state) => state.invoiceSlice[key]
    );

    const getStorageData = () => {
        const storageData = localStorage.getItem(key);
        if (storageData) return JSON.parse(storageData);
        else return invoices;
    };

    useEffect(() => {
        const data = getStorageData();
        dispatch(updateInvoices(data, key));
    }, []);

    useEffect(() => {
        dispatch(setLocalStorage(key));
        dispatch(calcSummary(key));
    }, [invoices]);

    return invoices;
}
