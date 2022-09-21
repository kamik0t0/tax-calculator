export const arrayComparsion = <
    T extends { id: string },
    S extends { employeeId: string }
>(
    arr1: T[],
    arr2: S[]
): T[] => {
    const uniq: T[] = [];
    const mapped1: string[] = [...arr1].map((elem) => elem.id);
    const mapped2: string[] = [...arr2].map((elem) => elem.employeeId);

    mapped1.forEach((id) => {
        if (!mapped2.includes(id)) {
            const uniqElem = arr1.find((item: T) => item.id === id);
            if (uniqElem) uniq.push(uniqElem);
        }
    });
    return uniq;
};
