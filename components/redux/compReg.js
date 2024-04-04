import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: false
}
 
export const toggleRegSlice = createSlice({
    name: 'toggleReg',
    initialState,
    reducers: {
        toggleRegState: (state = []) => {
          state.value = !state.value;
        }
    }
})

export const { toggleRegState } = toggleRegSlice.actions

export default toggleRegSlice.reducer