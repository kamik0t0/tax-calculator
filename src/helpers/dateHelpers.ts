export const isInteravalCorrect = (dateStart: number, dateEnd: number) => {
    const dateDiff = dateEnd - dateStart;
    if (dateDiff >= 0) return true;
    else return false;
};

export const timestampToNativeHTMLStringConverter = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString().split(".").reverse().join("-");
