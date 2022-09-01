import React, { useState } from "react";

export const useFilterColumn = (
    initialColumn: string = "client"
): [string, (value: string) => void] => {
    const [column, setColumnState] = useState<string>(initialColumn);

    const setColumn = (value: React.SetStateAction<string>) =>
        setColumnState(value);

    return [column, setColumn];
};
