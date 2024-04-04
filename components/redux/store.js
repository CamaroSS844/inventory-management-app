import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsListSlice";
import salesLogReducer from "./salesLogSlice";
import removalsLogReducer from "./removalsLogSlice";
import newScreenLogReducer from "./newScreenLogSlice";
import productNameReducer from "./productNameSlice";
import accountsReducer from "./authenticationSlice";
import currentBarcodeSlice from "./currentBarcodeSlice";
import toggleBSSlice from "./toggleBSSlice";
import toggleRegSlice from "./compReg";

export const store = configureStore({
    reducer: {
        inventoryList: productsReducer,
        salesLog: salesLogReducer,
        removalsLog: removalsLogReducer,
        stockingLog: newScreenLogReducer,
        productLog: productNameReducer,
        accounts: accountsReducer,
        currentBCS: currentBarcodeSlice,
        toggleBS: toggleBSSlice,
        toggleReg: toggleRegSlice
    }
}) 

