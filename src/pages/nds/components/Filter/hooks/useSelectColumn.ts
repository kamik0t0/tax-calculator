import { useToggle } from "../../../../../hooks/useToggle";

export const useSelectColumn = () => {
    // // стейт выбора колонки фильтрации
    const [_c, handleSelectColumn] = useToggle(false);
    // // стейт выбора критерия фильтрации
    const [_s, handleSelectSummCriterion] = useToggle(false);

    return [handleSelectColumn, handleSelectSummCriterion] as const;
};
