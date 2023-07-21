import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsListSlice";
import salesLogReducer from "./salesLogSlice";
import removalsLogReducer from "./removalsLogSlice";
import newScreenLogReducer from "./newScreenLogSlice";

export const store = configureStore({
    reducer: {
        inventoryList: productsReducer,
        salesLog: salesLogReducer,
        removalsLog: removalsLogReducer,
        newScreenLog: newScreenLogReducer,
    }
}) 

