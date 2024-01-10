import { createSlice } from "@reduxjs/toolkit";

/*
second account
1234567890
*/



const initialState = {
    value: '3935762003631'
  }


export const currentBCSlice= createSlice({
    name: 'currentBCS',
    initialState,
    reducers: {
        newBarcode: (state = {}, action) => {
            /*
            action.payload format
            '1234567890'
            */
            state.value = action.payload;
        },
        removeBarcode: (state = {}) => {
            /**
             * action.payload format
             * "Fernandez Torres"
             */
            state.value = false
        }
    }
})


export const { newBarcode, removeBarcode } = currentBCSlice.actions
export default currentBCSlice.reducer

