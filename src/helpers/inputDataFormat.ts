export function makeDefaultDate(data: number): string {
    const date = new Date(data);
    const month =
        date.getMonth() >= 10
            ? date.getMonth() + 1
            : "0" + +(date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : "0" + +date.getDate();

    return `${date.getFullYear()}-${month}-${day}`;
}
