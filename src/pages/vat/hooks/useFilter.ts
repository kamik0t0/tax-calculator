import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IPropSignature } from "../../../types/propSignature";
import { filterByString, filterBySumm } from "@scripts/filters";
// TODO: отвязать от column и сделать переиспользуемый хук по аналогии с useSort
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
