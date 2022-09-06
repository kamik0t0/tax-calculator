import { IPropSignature } from "../interfaces/IPropSignature";

// сортировки по:
// - дате
export function sortByDate<T extends IPropSignature>(
    items: T[],
    sortOrder: boolean,
    prop: string
): T[] {
    return sortOrder
        ? items.sort(
              (a, b) =>
                  Date.parse(a[prop] as string) - Date.parse(b[prop] as string)
          )
        : items.sort(
              (a, b) =>
                  Date.parse(b[prop] as string) - Date.parse(a[prop] as string)
          );
}
// - контрагенту
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
// - сумме
export function sortByNumber<T extends IPropSignature>(
    items: T[],
    sortOrder: boolean,
    prop: string
): T[] {
    return sortOrder
        ? items.sort((a, b) => +a[prop] - +b[prop])
        : items.sort((a, b) => +b[prop] - +a[prop]);
}
