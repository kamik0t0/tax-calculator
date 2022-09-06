import React, { useState } from "react";
import { IPropSignature } from "../../../interfaces/IPropSignature";
import { useTypedDispatch } from "../../../redux/hooks/hooks";
import { updateInvoices } from "../../../redux/reducers/invoice-reducer";
import { sortByDate, sortByNumber, sortByString } from "../../../scripts/sorts";
import { SortFields } from "../utils/enums";

const defineProperties = (property: string | number | boolean) => ({
    value: property,
    writable: true,
    configurable: true,
    enumerable: true,
});

export const useSort = <T extends IPropSignature>(
    table: string,
    invoices: T[]
) => {
    const dispatch = useTypedDispatch();
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    const sort = (event: React.MouseEvent<HTMLTableCellElement>): void => {
        const sortField: string = event.currentTarget.innerHTML;

        let sortedItems: typeof invoices;

        const InvoicesToDispatch: T[] = [...invoices].map((invoice: T) =>
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
                sortedItems = sortByDate(
                    InvoicesToDispatch,
                    sortOrder,
                    SortFields.date
                );
                break;
            case "Покупатель":
                sortedItems = sortByString(
                    InvoicesToDispatch,
                    sortOrder,
                    SortFields.client
                );
                break;
            case "Продавец":
                sortedItems = sortByString(
                    InvoicesToDispatch,
                    sortOrder,
                    SortFields.client
                );
                break;
            case "Сумма":
                sortedItems = sortByNumber(
                    InvoicesToDispatch,
                    sortOrder,
                    SortFields.summ
                );
                break;

            default:
                sortedItems = sortByNumber(
                    InvoicesToDispatch,
                    sortOrder,
                    SortFields.summ
                );
        }
        setSortOrder(!sortOrder);
        dispatch(updateInvoices(sortedItems, table));
    };

    return [sort, sortOrder];
};
