import { toRU } from "../../../helpers/currencyFormat";

export const cellValueDisplayFormat = (type: string, data: number | string) => {
    switch (type) {
        case "date":
            return data.toString().split("-").reverse().join(".");
        case "number":
            return toRU.format(+data);
        default:
            return data;
    }
};
