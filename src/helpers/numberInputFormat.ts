export const NoDecimalBoundary = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
    const value = event.target.value;
    const length = value.length;
    if (event.target.value.indexOf(".") != -1) {
        event.target.value = event.target.value.substring(0, length);
    }
};
export const twoDecimalBoundary = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
    if (event.target.value.indexOf(".") != -1) {
        event.target.value = event.target.value.substring(
            0,
            event.target.value.indexOf(".") + 3
        );
    }
};
