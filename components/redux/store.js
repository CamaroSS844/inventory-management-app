import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsListSlice";
import salesLogReducer from "./salesLogSlice";
import removalsLogReducer from "./removalsLogSlice";
import newScreenLogReducer from "./newScreenLogSlice";
import productNameReducer from "./productNameSlice";

export const store = configureStore({
    reducer: {
        inventoryList: productsReducer,
        salesLog: salesLogReducer,
        removalsLog: removalsLogReducer,
        stockingLog: newScreenLogReducer,
        productLog: productNameReducer
    }
}) 

