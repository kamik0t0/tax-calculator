import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";

export function useValue(initialValue: string | number) {
    const [value, setValue] = useState<typeof initialValue>(initialValue);

    function valueHandler<
        T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(event: ChangeEvent<T> | SelectChangeEvent<string | number>): void {
        setValue(event.target.value);
    }

    return [value, valueHandler] as const;
}
