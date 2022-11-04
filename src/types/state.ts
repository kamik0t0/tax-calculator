import { IDialog } from "@dialogstore/dialog-reducer";
import { ITax } from "pages/calculator/exports/types";
import { ISalaries } from "pages/salary/pages/accrual/exports/interfaces";
import { IInvoices } from "pages/vat/exports/interfaces";
import { ISnackBar } from "types/snackBar";

export interface State {
    invoiceSlice: IInvoices;
    salarySlice: ISalaries;
    snackBarSlice: ISnackBar;
    dialogSlice: IDialog;
    calcSlice: ITax;
}
