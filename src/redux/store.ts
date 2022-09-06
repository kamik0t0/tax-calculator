import { configureStore } from "@reduxjs/toolkit";
import { reducer as invoiceSlice } from "./reducers/invoice-reducer";

const store = configureStore({
    reducer: {
        invoiceSlice: invoiceSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
