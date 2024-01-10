import { createSlice } from "@reduxjs/toolkit";

/*
action.payload format
"1234":"music",

stock added 
sales
stock removed
adjustable intervals, daily weekly, monthly
display monthly graphs or 
*/



const initialState = {
    value: {
        "1234":"music", 
        "12345":"soap",
        "123456": "box",
        "1234567":"table",
        "1234567890":"books",
}}


export const productNamesSlice = createSlice({
    name: 'productLog',
    initialState,
    reducers: {
        logProduct: (state = {}, action) => {
            /*
            action.payload format
            "1234":"music",
            */
            state.value = addToInventory(state.value, action.payload);
        },
    }
})


export const { logProduct } = productNamesSlice.actions

export default productNamesSlice.reducer

const addToInventory = ( state, item) => {
    return {...state, ...item}
};
