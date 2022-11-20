export const toPercent = (fraction: number, fix: number) => {
    return +(fraction * 100).toFixed(fix);
};
export const toFraction = (percent: number, fix: number) => {
    return +(percent / 100).toFixed(fix);
};
