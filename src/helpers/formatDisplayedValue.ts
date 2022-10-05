export const formatDisplayedValue = (data: number | string) => {
    if (data === -1) {
        return "mix";
    } else if (data === 0.1 || data === 0.2 || data === 0) {
        const rate = +data as number;
        return `${rate * 100}%`;
    } else return data;
};
