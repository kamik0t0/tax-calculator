export const roundNumber = (value: string | number, fix: number) => {
    const isNumber = +value;
    return typeof isNumber === "string" ? value : +isNumber.toFixed(fix);
};
