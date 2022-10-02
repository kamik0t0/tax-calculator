import { IPropSignature } from "../types/propSignature";

export function sortByString<T extends IPropSignature>(
    items: T[],
    sortOrder: boolean,
    prop: string
): T[] {
    return sortOrder
        ? items.sort((a, b) =>
              a[prop].toString().localeCompare(b[prop].toString())
          )
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
