export const InputDataFormat = (type: string, data: number | string) => {
    switch (type) {
        case "date":
            return data.toString().split(".").reverse().join("-");
        default:
            return data;
    }
};
