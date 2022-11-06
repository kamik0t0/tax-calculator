import { IPropSignature } from "../types/propSignature";

export function sortByString<T extends IPropSignature>(
    items: T[],
    sortOrder: boolean,
    prop: string
): T[] {
    return sortOrder
        ? items.sort((a, b) => {
              console.log(a, b);

              return a[prop].toString().localeCompare(b[prop].toString());
          })
        : items.sort((a, b) =>
              b[prop].toString().localeCompare(a[prop].toString())
          );
}
export function sortByNumber<T extends IPropSignature>(
    items: T[],
    sortOrder: boolean,
    prop: string
): T[] {
    return sortOrder
        ? items.sort((a, b) => +a[prop] - +b[prop])
        : items.sort((a, b) => +b[prop] - +a[prop]);
}
export function sortByIndex<T extends IPropSignature>(
    items: T[],
    sortOrder: boolean
): T[] {
    console.log(items);
    const mapped = items.map((item, index) => ({ item, index }));

    const sorted = sortOrder
        ? mapped.sort((a, b) => +a.index - +b.index)
        : mapped.sort((a, b) => +b.index - +a.index);
    return sorted.map((item) => item.item);
}

// export function sortByDate<T extends IPropSignature>(
//     items: T[],
//     sortOrder: boolean,
//     prop: string
// ): T[] {
//     return sortOrder
//         ? items.sort((a, b) => {
//               console.log(Date.parse(a[prop]));

//               return Date.parse(a[prop]) - Date.parse(b[prop]);
//           })
//         : items.sort((a, b) => {
//               console.log(Date.parse(a[prop]));
//               return Date.parse(b[prop]) - Date.parse(a[prop]);
//           });
// }
