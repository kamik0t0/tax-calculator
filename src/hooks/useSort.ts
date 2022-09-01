import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { IInvoice } from "../interfaces/IInvoice";
import { sortByCounterparty, sortByDate, sortBySumm } from "../scripts/sorts";
import { useTypedDispatch } from "../redux/hooks/hooks";

const defineProperties = (property: string | number | boolean) => ({
    value: property,
    writable: true,
    configurable: true,
    enumerable: true,
});

export const useSort = (
    action: ActionCreatorWithPayload<IInvoice[], string>,
    invoices: IInvoice[]
) => {
    const dispatch = useTypedDispatch();
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    const sort = (event: React.MouseEvent<HTMLTableCellElement>): void => {
        const sortField: string = event.currentTarget.innerHTML;

        let sortedItems: IInvoice[];

        const InvoicesToDispatch: IInvoice[] = [...invoices].map(
            (invoice: IInvoice) =>
                Object.defineProperties(Object.assign({}, invoice), {
                    date: defineProperties(invoice.date),
                    client: defineProperties(invoice.client),
                    nds: defineProperties(invoice.nds),
                    summ: defineProperties(invoice.summ),
                    checked: defineProperties(invoice.checked),
                })
        );

        switch (sortField) {
            case "Дата":
                sortedItems = sortByDate(InvoicesToDispatch, sortOrder);
                break;
            case "Покупатель":
                sortedItems = sortByCounterparty(InvoicesToDispatch, sortOrder);
                break;
            case "Продавец":
                sortedItems = sortByCounterparty(InvoicesToDispatch, sortOrder);
                break;
            case "Сумма":
                sortedItems = sortBySumm(InvoicesToDispatch, sortOrder);
                break;

            default:
                sortedItems = sortBySumm(InvoicesToDispatch, sortOrder);
        }
        setSortOrder(!sortOrder);
        dispatch(action(sortedItems));
    };

    return [sort, sortOrder];
};
