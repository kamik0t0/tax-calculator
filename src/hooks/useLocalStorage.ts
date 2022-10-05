import {
    ActionCreatorWithPayload,
    ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useTypedDispatch } from "@reduxhooks/hooks";

export function useLocalStorage<T>(
    key: string,
    items: T[],
    loadAction:
        | ActionCreatorWithPreparedPayload<
              [payload: T[], table: string],
              T[],
              string,
              never,
              { table: string }
          >
        | ActionCreatorWithPayload<T[]>,
    setLocalStorageAction: ActionCreatorWithPayload<string>,
    ...sideActions: ActionCreatorWithPayload<string>[]
): T[] {
    const dispatch = useTypedDispatch();

    const getStorageData = () => {
        const storageData = localStorage.getItem(key);

        if (storageData) return JSON.parse(storageData);
        else return items;
    };

    useEffect(() => {
        const data = getStorageData();
        dispatch(loadAction(data, key));
    }, []);

    useEffect(() => {
        dispatch(setLocalStorageAction(key));
        if (sideActions.length > 0)
            sideActions.forEach((action) => {
                dispatch(action(key));
            });
    }, [items]);

    return items;
}
