import React, { ChangeEvent } from "react";
import { useFilterColumn } from "./useColumnFilter";
import { useSummFilter } from "./useSummFilter";
import { IInvoice } from "../interfaces/IInvoice";
import { filterByColumn, filterBySumm } from "../scripts/filters";

export const useFilter = (
    invoices: IInvoice[],
    setInvoices: ([]) => void
): {
    column: string;
    setColumn: (value: string) => void;
    summCriterion: string;
    setSummCriterion: (value: string) => void;
    filterList: (event: ChangeEvent<HTMLInputElement>) => void;
} => {
    const [column, setColumn] = useFilterColumn();
    const [summCriterion, setSummCriterion] = useSummFilter();

    const filterList = (event: ChangeEvent<HTMLInputElement>): void => {
        switch (column) {
            case "summ":
                setInvoices(filterBySumm(event, invoices, summCriterion));
                break;

            default:
                setInvoices(filterByColumn(event, invoices, column));
                break;
        }
    };

    return { column, setColumn, summCriterion, setSummCriterion, filterList };
};
