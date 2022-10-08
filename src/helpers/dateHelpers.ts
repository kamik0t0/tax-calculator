export const isInteravalCorrect = (dateStart: number, dateEnd: number) => {
    const dateDiff = dateEnd - dateStart;
    if (dateDiff >= 0) return true;
    else return false;
};

export const timestampToNativeHTMLStringConverter = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString().split(".").reverse().join("-");

export const timestampToNativeToLocaleString = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString();

export const defaultDateToLocalRU = (date: string) =>
    date.toString().split("-").reverse().join(".");

export function makeDefaultDate(data: number): string {
    const date = new Date(data);
    const month =
        date.getMonth() >= 10 ? date.getMonth() + 1 : +(date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : "0" + +date.getDate();

    return `${date.getFullYear()}-${month}-${day}`;
}