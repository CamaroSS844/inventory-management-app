import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsListSlice";

export const store = configureStore({
    reducer: {
        inventoryList: productsReducer,
    }
}) 

