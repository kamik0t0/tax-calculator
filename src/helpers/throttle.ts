import { MutableRefObject } from "react";

export function throttle(
    func: (x: any[]) => void,
    isCooldown: MutableRefObject<boolean | null>,
    savedArgs: MutableRefObject<any[] | null>,
    savedThis: MutableRefObject<any[] | null>
) {
    const wrapper = (...args: any) => {
        if (isCooldown.current) {
            savedArgs.current = args;
            return;
        }
        func(args);
        isCooldown.current = true;
        setTimeout(() => {
            isCooldown.current = false;
            if (savedArgs.current) {
                wrapper.apply(savedThis.current, savedArgs.current);
                savedArgs.current = savedThis.current = null;
            }
        }, 1000);
    };
    return wrapper;
}
