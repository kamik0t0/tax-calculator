import { ChangeEvent } from "react";
import { IInvoice } from "../interfaces/IInvoice";

export const filterByColumn = (
    event: ChangeEvent<HTMLInputElement>,
    invoices: IInvoice[],
    column: string
): IInvoice[] => {
    const inputValue = event.target.value.toString().toLowerCase();

    let regexp = new RegExp(inputValue, "g");

    return invoices.filter(
        (invoice: IInvoice) =>
            invoice[column].toString().toLowerCase().search(regexp) !== -1
    );
};

export const filterBySumm = (
    event: ChangeEvent<HTMLInputElement>,
    invoices: IInvoice[],
    summCriterion: string
): IInvoice[] => {
    const userSumm = +event.target.value;
    if (userSumm === 0) {
        return invoices;
    } else {
        switch (summCriterion) {
            case "more":
                return invoices.filter(
                    (invoice: IInvoice) => +invoice.summ > userSumm
                );
            case "less":
                return invoices.filter(
                    (invoice: IInvoice) => +invoice.summ < userSumm
                );
            case "equal":
                return invoices.filter(
                    (invoice: IInvoice) => +invoice.summ === userSumm
                );
            default:
                return invoices.filter(
                    (invoice: IInvoice) => invoice.summ === userSumm
                );
        }
    }
};
