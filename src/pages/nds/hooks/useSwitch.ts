import React, { useState } from "react";

export const useSwitch = () => {
    const [inputToggle, setInputToggle] = useState<boolean>(false);

    const switchInput = () => setInputToggle((prev) => !prev);
    return [inputToggle, switchInput] as const;
};
