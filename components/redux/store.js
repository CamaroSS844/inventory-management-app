import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./productsListSlice";

export const store = configureStore({
    reducer: {
        fList: favoritesReducer,
    }
}) 

