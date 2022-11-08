export const toRU = new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 2,
});
export const toPercentView = new Intl.NumberFormat("ru", {
    style: "percent",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
});
