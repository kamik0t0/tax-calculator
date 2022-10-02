import { toRU } from "@helpers/currencyFormat";

export const formatDisplayedValue = (
    type: string = "string",
    data: number | string
) => {
    switch (type) {
        case "date":
            return data.toString().split("-").reverse().join(".");
        case "number":
            return toRU.format(+data);
        case "select":
            if (data === -1) {
                return "mix";
            } else if (data === 0.1 || data === 0.2 || data === 0) {
                const rate = +data as number;
                return `${rate * 100}%`;
            } else return data;

        default:
            return data;
    }
};
