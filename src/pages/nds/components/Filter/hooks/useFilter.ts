import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IPropSignature } from "../../../../../interfaces/IPropSignature";
import { filterByString, filterBySumm } from "../../../../../scripts/filters";

export function useFilter<T extends IPropSignature>(
    items: T[],
    setItems: Dispatch<SetStateAction<T[]>>,
    summCriterion: string,
    column: string
): (event: ChangeEvent<HTMLInputElement>) => void {
    const filter = (event: ChangeEvent<HTMLInputElement>): void => {
        switch (column) {
            case "summ":
                setItems(filterBySumm(event, items, summCriterion));
                break;
            default:
                setItems(filterByString(event, items, column));
                break;
        }
    };

    return filter;
}
