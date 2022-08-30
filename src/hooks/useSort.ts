import React, { useState } from "react";
import { sortByDate, sortByCounterparty, sortBySumm } from "../scripts/sorts";
import { IInvoice } from "../interfaces/IInvoice";

export const useSort = (
    action: ([]: IInvoice[]) => void,
    invoices: IInvoice[]
) => {
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    const sort = (event: React.MouseEvent<HTMLTableCellElement>): void => {
        const sortField: string = event.currentTarget.innerHTML;
        let sortedItems: IInvoice[];
        switch (sortField) {
            case "Дата":
                sortedItems = sortByDate(invoices, sortOrder);
                break;
            case "Покупатель":
                sortedItems = sortByCounterparty(invoices, sortOrder);
                break;
            case "Продавец":
                sortedItems = sortByCounterparty(invoices, sortOrder);
                break;
            case "Сумма":
                sortedItems = sortBySumm(invoices, sortOrder);
                break;

            default:
                sortedItems = sortBySumm(invoices, sortOrder);
        }
        setSortOrder(!sortOrder);
        action(sortedItems);
    };

    return [sort, sortOrder];
};
