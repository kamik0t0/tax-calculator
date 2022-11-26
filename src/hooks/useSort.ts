import React, { useState } from "react";
import { IPropSignature } from "../types/propSignature";
import { sortByNumber, sortByString } from "@scripts/sorts";

export const useSort = <T extends IPropSignature>(items: T[]) => {
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    const InvoicesToDispatch: T[] = [...items].map((invoice: T) =>
        Object.assign({}, invoice)
    );
    const byNumber = (prop: string): T[] => {
        setSortOrder(!sortOrder);
        return sortByNumber(InvoicesToDispatch, sortOrder, prop);
    };
    const byString = (prop: string): T[] => {
        setSortOrder(!sortOrder);
        return sortByString(InvoicesToDispatch, sortOrder, prop);
    };

    return { byNumber, byString, sortOrder };
};
