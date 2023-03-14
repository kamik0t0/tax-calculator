import { useCallback, useRef } from "react";

export const useDebounce = (
    callback: (value: string | number, index: number, prop: string) => any,
    delay: number = 1000
) => {
    const timer = useRef<string | number | undefined | NodeJS.Timeout>();

    const debounceCallback = useCallback(
        (value: string | number, index: number, prop: string) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                callback(value, index, prop);
            }, delay);
        },
        [callback, delay]
    );
    return debounceCallback;
};
