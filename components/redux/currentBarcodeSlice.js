import { createSlice } from "@reduxjs/toolkit";

/*
second account
1234567890
*/



const initialState = {
    barcode: "",
    productName: "",
    price: "",
  }


export const currentBCSlice= createSlice({
    name: 'currentBCS',
    initialState,
    reducers: {
        currentItem: (state = {}, action) => {
            /*
            action.payload format
            {
                barcode: "",
                productName: "",
                price: ""
            }
            */
            state.value = action.payload;
        }
    }
})


export const { currentItem } = currentBCSlice.actions
export default currentBCSlice.reducer

