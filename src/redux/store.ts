import { configureStore } from "@reduxjs/toolkit";
import { reducer as invoiceSlice } from "@invoicesstore/invoice-reducer";
import { reducer as salarySlice } from "@salarystore/salary-reducer";

const store = configureStore({
    reducer: {
        invoiceSlice: invoiceSlice,
        salarySlice: salarySlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
