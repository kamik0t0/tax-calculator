import React, { useState } from "react";

export const useSummFilter = (
    initialSummCriterion: string = "more"
): [string, (value: string) => void] => {
    const [summCriterion, setSummCriterionState] =
        useState<string>(initialSummCriterion);

    const setSummCriterion = (value: React.SetStateAction<string>) => {
        setSummCriterionState(value);
    };
    return [summCriterion, setSummCriterion];
};
