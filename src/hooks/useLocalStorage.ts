import {
    ActionCreatorWithPayload,
    ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useTypedDispatch } from "@reduxhooks/hooks";

export function useLocalStorage<T>(
    key: string,
    initialItems: T[],
    loadAction:
        | ActionCreatorWithPreparedPayload<
              [payload: T[], table: string],
              T[],
              string,
              never,
              { table: string }
          >
        | ActionCreatorWithPayload<T[]>,
    ...sideActions: ActionCreatorWithPayload<string>[]
): T[] {
    let data: T[] = initialItems;

    const dispatch = useTypedDispatch();

    const getStorageData = (key: string) => {
        const storageData = localStorage.getItem(key);
        return storageData ? JSON.parse(storageData) : initialItems;
    };

    useEffect(() => {
        data = getStorageData(key);
        dispatch(loadAction(data, key));
    }, []);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
        if (sideActions.length > 0)
            sideActions.forEach((action) => {
                dispatch(action(key));
            });
    }, [initialItems]);

    return data;
}
