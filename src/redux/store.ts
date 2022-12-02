import { configureStore } from "@reduxjs/toolkit";
import { reducer as invoiceSlice } from "@invoicesstore/invoice-reducer";
import { reducer as salarySlice } from "@salarystore/salary-reducer";
import { reducer as snackBarSlice } from "./ui-slice/ui-reducer";
import { reducer as dialogSlice } from "./dialog-slice/dialog-reducer";
import { reducer as calcSlice } from "@calcstore/calculator-reducer";
// import { reducer as fineSliceTest } from "../pages/fines/slice/fines-data-reducer";
import { reducer as fineSlice } from "@finestore/fines-reducer";

const store = configureStore({
    reducer: {
        invoiceSlice: invoiceSlice,
        salarySlice: salarySlice,
        snackBarSlice: snackBarSlice,
        dialogSlice: dialogSlice,
        calcSlice: calcSlice,
        fineSlice: fineSlice,
        // fineSliceTest: fineSliceTest,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
