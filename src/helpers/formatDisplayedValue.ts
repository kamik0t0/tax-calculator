import { toPercentView } from "./currencyFormat";

export const formatDisplayedValue = (rate: number) => {
    if (rate === -1) {
        return "mix";
    } else if (rate === 10 || rate === 20 || rate === 0) {
        return toPercentView.format(rate);
    } else return toPercentView.format(rate);
};
