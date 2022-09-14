import React, { useState } from "react";
import { IPropSignature } from "../interfaces/IPropSignature";
import { sortByDate, sortByNumber, sortByString } from "@scripts/sorts";

export const useSort = <T extends IPropSignature>(items: T[]) => {
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    const InvoicesToDispatch: T[] = [...items].map((invoice: T) =>
        Object.assign({}, invoice)
    );
    const byDate = (prop: string): T[] => {
        setSortOrder(!sortOrder);
        return sortByDate(InvoicesToDispatch, sortOrder, prop);
    };
    const byNumber = (prop: string): T[] => {
        setSortOrder(!sortOrder);
        return sortByNumber(InvoicesToDispatch, sortOrder, prop);
    };
    const byString = (prop: string): T[] => {
        setSortOrder(!sortOrder);
        return sortByString(InvoicesToDispatch, sortOrder, prop);
    };

    return { byDate, byNumber, byString, sortOrder };
};
