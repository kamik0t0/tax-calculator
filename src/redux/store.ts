import { configureStore } from "@reduxjs/toolkit";
import { reducer as invoiceSlice } from "@invoicesstore/invoice-reducer";
import { reducer as salarySlice } from "@salarystore/salary-reducer";
import { reducer as snackBarSlice } from "./ui-slice/ui-reducer";
import { reducer as dialogSlice } from "./dialog-slice/dialog-reducer";
import { reducer as calcSlice } from "@calcstore/calculator-reducer";
import { reducer as fineSlice } from "@finestore/fines-reducer";
import { reducer as employee } from "../pages/employees/slice/employee-reducer";

export const store = configureStore({
    reducer: {
        invoiceSlice: invoiceSlice,
        salarySlice: salarySlice,
        snackBarSlice: snackBarSlice,
        dialogSlice: dialogSlice,
        calcSlice: calcSlice,
        fineSlice: fineSlice,
        employee: employee,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
