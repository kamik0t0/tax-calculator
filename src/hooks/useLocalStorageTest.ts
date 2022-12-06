import { useTypedDispatch } from "@reduxhooks/hooks";
import { ActionCreatorWithPayload, EntityId } from "@reduxjs/toolkit";
import { useEffect } from "react";

export function useLocalStorage<T>(
    key: string,
    initialItems: T[],
    loadAction: ActionCreatorWithPayload<
        readonly T[] | Record<EntityId, T>,
        string
    >,
    ...sideActions: ActionCreatorWithPayload<string>[]
): T[] {
    let data: T[] = initialItems;

    const dispatch = useTypedDispatch();

    const getStorageData = (key: string): T[] => {
        const storageData = localStorage.getItem(key);
        return storageData ? JSON.parse(storageData) : initialItems;
    };

    useEffect(() => {
        data = getStorageData(key);
        dispatch(loadAction(data));
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
